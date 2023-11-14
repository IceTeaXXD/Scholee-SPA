import { Flex, Box, SimpleGrid, Heading, Text, useColorModeValue, useColorMode } from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"

const UniversityHome = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const boxColor = useColorModeValue("green.200", "green.800")

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
          bg={boxColor}
          height="80px"
          borderRadius="md"
          p={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Link
            to = {`/report`}
          >
          <ArrowForwardIcon w={6} h={6} mr={2} /> View Students
          </Link>
        </Box>
        <Box
          bg={boxColor}
          height="80px"
          borderRadius="md"
          p={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Link
            to = {`/dashboard`}
          >
            <ArrowForwardIcon w={6} h={6} mr={2} /> View Dashboard
          </Link>
        </Box>
      </SimpleGrid>
    </Flex>
  )
}

export default UniversityHome
