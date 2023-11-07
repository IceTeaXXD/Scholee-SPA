import { Flex, Box, Text } from "@chakra-ui/react"

const Dashboard = () => {
    // get auth data
    return (
        <Box w="100%">
            <Flex
                pos="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
            >
                <Text>Dashboard Page</Text>
            </Flex>
        </Box>
    )
}

export default Dashboard
