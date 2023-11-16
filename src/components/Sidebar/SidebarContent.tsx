import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps
} from "@chakra-ui/react"
import { FiHome, FiBarChart, FiCompass, FiBriefcase } from "react-icons/fi"
import { IconType } from "react-icons"
import NavItem from "./NavItem"
import { ReactComponent as Logo } from "../../assets/logo-1.svg"
import { useEffect, useState } from "react"
import { handleGetInfo } from "../../utils/auth"
interface SidebarProps extends BoxProps {
  onClose: () => void
}

interface LinkItemProps {
  name: string
  icon: IconType
  link: string
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    role: ""
  })
  const getInfo = async () => {
    const response = await handleGetInfo()
    const name = response?.data.name
    const email = response?.data.email
    const role = response?.data.roles
    setUserInfo({ name, email, role })
  }

  useEffect(() => {
    getInfo()
  }, [])

  const LinkItems: Array<LinkItemProps> = []

  if (userInfo.role === "organization") {
    LinkItems.push(
      { name: "Home", icon: FiHome, link: "/" },
      { name: "Dashboard", icon: FiBriefcase, link: "/dashboard" },
      { name: "Report", icon: FiBarChart, link: "/report" },
      { name: "Scholarships", icon: FiCompass, link: "/scholarships" }
    )
  } else {
    LinkItems.push(
      { name: "Home", icon: FiHome, link: "/" },
      { name: "Dashboard", icon: FiBriefcase, link: "/dashboard" },
      { name: "Report", icon: FiBarChart, link: "/report" }
    )
  }

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Logo height="40" width="40" />
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((item) => (
        <NavItem key={item.name} icon={item.icon} link={item.link} onClick={onClose}>
          {item.name}
        </NavItem>
      ))}
    </Box>
  )
}

export default SidebarContent
