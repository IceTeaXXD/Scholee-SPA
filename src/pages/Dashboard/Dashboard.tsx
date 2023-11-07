import { Flex, Box, Text } from "@chakra-ui/react"
import { getAuthData } from "../../utils/auth"
const Dashboard = () => {
    // get auth data
    getAuthData()
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
