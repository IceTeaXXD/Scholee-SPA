import { Flex, Box, Text } from "@chakra-ui/react"
import Sidebar from "../../components/Sidebar/Sidebar"
const Home = () => {
    return (
        <Box w="100%">
            <Sidebar />
            <Flex
                pos="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
            >
                <Text>Home Page</Text>
            </Flex>
        </Box>
    )
}

export default Home
