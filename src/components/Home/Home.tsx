import { Flex, Box, SimpleGrid, Heading, Text } from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"

const Home = () => {
  return (
    <Flex direction="column" alignItems="center" justifyContent="center">
      <Heading as="h1" size="2xl">
        Home
      </Heading>

      <Text
        as="h5"
        fontSize="lg"
        fontWeight="normal"
        fontStyle="italic"
        textAlign="center"
        mt={4}
      >
        What do you want to do?
      </Text>

      <SimpleGrid columns={2} spacing={10} mt={8}>
        <Box
          bg="aquamarine"
          height="80px"
          borderRadius="md"
          p={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ArrowForwardIcon w={6} h={6} mr={2} /> View Scholarships
        </Box>
        <Box
          bg="aquamarine"
          height="80px"
          borderRadius="md"
          p={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ArrowForwardIcon w={6} h={6} mr={2} /> View Applications
        </Box>
        <Box
          bg="aquamarine"
          height="80px"
          borderRadius="md"
          p={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ArrowForwardIcon w={6} h={6} mr={2} /> View Assignments
        </Box>
        <Box
          bg="aquamarine"
          height="80px"
          borderRadius="md"
          p={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ArrowForwardIcon w={6} h={6} mr={2} /> View Dashboard
        </Box>
      </SimpleGrid>
    </Flex>
  )
}

export default Home
