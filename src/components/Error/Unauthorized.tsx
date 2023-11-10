import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Page404 = () => {
  return (
    <Flex alignItems="center" justifyContent="center" minH="100vh">
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, teal.400, teal.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Unauthorized Access
        </Text>
        <Text color={"gray.500"} mb={6}>
          You don&apos;t have permission to access this page
        </Text>

        <Link to="/login">
          <Button
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            color="white"
            variant="solid"
          >
            Back to Login
          </Button>
        </Link>
      </Box>
    </Flex>
  )
}

export default Page404
