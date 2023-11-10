import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps
} from "@chakra-ui/react"
import {
  FiHome,
  FiBarChart,
  FiCompass,
  FiSettings,
  FiBriefcase
} from "react-icons/fi"
import { IconType } from "react-icons"
import NavItem from "./NavItem"
import { ReactComponent as Logo } from "../../assets/logo-1.svg"

interface SidebarProps extends BoxProps {
  onClose: () => void
}

interface LinkItemProps {
  name: string
  icon: IconType
  link: string
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, link: "/" },
  { name: "Dashboard", icon: FiBriefcase, link: "/dashboard" },
  { name: "Report", icon: FiBarChart, link: "/report" },
  { name: "Scholarships", icon: FiCompass, link: "/scholarships" },
  { name: "Settings", icon: FiSettings, link: "/" }
]

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
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
        <NavItem key={item.name} icon={item.icon} link={item.link}>
          {item.name}
        </NavItem>
      ))}
    </Box>
  )
}

export default SidebarContent
