import { Button, Flex, IconButton, Text } from "@chakra-ui/react"
import Sidebar from "../../components/Sidebar"
const Home = () => {
    return (
        <Flex w="100%">
            <Sidebar />
            <Flex
                pos="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
            >
                <Text>Home Page</Text>
            </Flex>
        </Flex>
    )
}

export default Home
