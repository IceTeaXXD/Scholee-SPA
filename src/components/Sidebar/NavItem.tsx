import { Box, Flex, Icon, FlexProps } from "@chakra-ui/react"
import { IconType } from "react-icons"
import { Link } from "react-router-dom"
interface NavItemProps extends FlexProps {
  icon: IconType
  children: React.ReactNode
  link: string
  onClick?: () => void
}
const NavItem = ({ icon, children, link, onClick, ...rest }: NavItemProps) => {
  return (
    <Link to={link} onClick={onClick}>
      <Box style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white"
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white"
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </Link>
  )
}

export default NavItem
