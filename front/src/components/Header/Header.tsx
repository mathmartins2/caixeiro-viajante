import { Flex, Box, Text, Image } from '@chakra-ui/react';

function Header() {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="1.5rem"
      backgroundColor="blue.500"
      color="white"
      boxShadow="sm"
    >
      <Box display="flex" alignItems="center">
        <Image
          src="../../public/logo.jpeg"
          boxSize="50px"
          marginRight="12px"
          alt="Logo"
          borderRadius='full'
        />
        <Text fontSize="lg" fontWeight="bold">
          Customer Management
        </Text>
      </Box>
    </Flex>
  );
}

export default Header;
