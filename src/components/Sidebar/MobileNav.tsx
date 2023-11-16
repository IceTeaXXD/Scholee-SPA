import {
  IconButton,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
} from "@chakra-ui/react"
import { FiMenu, FiChevronDown } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as Logo } from "../../assets/logo-1.svg"
import AvatarWithRipple from "../Avatar/Avatar"
import { useState, useEffect } from "react"
import { handleGetInfo, handleLogout } from "../../utils/auth"
interface MobileProps extends FlexProps {
  onOpen: () => void
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    user_id: 0,
    name: "",
    email: "",
    role: ""
  })

  const getInfo = async () => {
    const response = await handleGetInfo()
    setUserInfo({
      user_id: response?.data.user_id,
      name: response?.data.name,
      email: response?.data.email,
      role: response?.data.roles
    })
  }

  useEffect(() => {
    getInfo()
  }, [])

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Logo height="40" width="40" />
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <AvatarWithRipple />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  {/* NAME */}
                  <Text fontSize="sm">{userInfo?.name}</Text>
                  {/* ROLE */}
                  <Text fontSize="xs" color="gray.600">
                    {userInfo.role?.charAt(0).toUpperCase() +
                      userInfo.role?.slice(1)}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <Link
                to="/login"
                onClick={async (event) => {
                  event.preventDefault()
                  await handleLogout()
                  navigate("/login")
                }}
              >
                <MenuItem>Sign out</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

export default MobileNav
