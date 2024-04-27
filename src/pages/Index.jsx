import React, { useState } from "react";
import { Box, Button, Text, VStack, Input, useToast, Heading, Image, FormControl, FormLabel } from "@chakra-ui/react";
import { FaEthereum, FaUserLock } from "react-icons/fa";

const Index = () => {
  const [userAddress, setUserAddress] = useState("");
  const toast = useToast();

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setUserAddress(accounts[0]);
        toast({
          title: "Connected",
          description: `Wallet ${accounts[0]} connected successfully.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to connect MetaMask.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Error",
        description: "MetaMask is not installed.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4} align="center" justify="center" height="100vh">
      <Heading mb={6}>ERC20 Wallet Connector</Heading>
      <Image src="https://images.unsplash.com/photo-1651221436727-28b9c922db97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxldGhlcmV1bSUyMGxvZ298ZW58MHx8fHwxNzE0MjQ0NTYxfDA&ixlib=rb-4.0.3&q=80&w=1080" boxSize="100px" />
      <Button leftIcon={<FaEthereum />} colorScheme="teal" onClick={connectMetaMask}>
        Connect with MetaMask
      </Button>
      {userAddress && (
        <Box p={4} shadow="md" borderWidth="1px" borderRadius="md">
          <Text>
            <FaUserLock /> Address: {userAddress}
          </Text>
        </Box>
      )}
      <FormControl id="admin-action" isRequired>
        <FormLabel>Admin Action</FormLabel>
        <Input placeholder="Enter user address to blacklist or allow" />
        <Button mt={4} colorScheme="red">
          Update Permissions
        </Button>
      </FormControl>
    </VStack>
  );
};

export default Index;
