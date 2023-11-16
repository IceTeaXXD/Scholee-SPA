import { Flex, Heading, Text } from "@chakra-ui/react"

const OrganizationReport = () => {
  return (
    <>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        mt="2rem"
      >
        <Heading as="h1" size="2xl" mb="1rem">
          Report
        </Heading>
        <Text fontSize="xl" mb="1rem">
          Organization Report
        </Text>
        <Text fontSize="lg" mb="1rem">
          This is the Organization Report page.
        </Text>
      </Flex>
    </>
  )
}

export default OrganizationReport
