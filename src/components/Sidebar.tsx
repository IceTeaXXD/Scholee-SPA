import { Avatar, Button, Divider, Flex, Text, Heading, IconButton, Switch, useColorMode, useColorModeValue, FormControl, FormLabel } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiDollarSign,
    FiBriefcase,
    FiSettings
} from 'react-icons/fi'
import NavItem from '../components/NavItem'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [navSize, changeNavSize] = useState("large")
    const [showDarkModeButton, setShowDarkModeButton] = useState(true); 
    const { colorMode, toggleColorMode } = useColorMode();
    const formBackground = useColorModeValue('blue.100', 'blue.700');
    const buttonColor = useColorModeValue('blue.400', 'blue.300');
    const textColor = useColorModeValue('gray.700', 'gray.100');

    const toggleDarkModeButton = () => {
        setShowDarkModeButton(!showDarkModeButton);
    };

    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    aria-label="Toggle Navigation Menu"
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small") {
                            changeNavSize("large");
                            setShowDarkModeButton(true); 
                        } else {
                            changeNavSize("small");
                            setShowDarkModeButton(false); 
                        }
                    }}
                />
                <Link to="/dashboard">
                    <NavItem navSize={navSize} icon={FiHome} title="Dashboard" active={undefined} description="This is the description for the dashboard." />
                </Link>
                <Link to="/calendar">
                    <NavItem navSize={navSize} icon={FiCalendar} title="Calendar" active={undefined} description={undefined} />
                </Link>
                <Link to="/reports">
                    <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" description={undefined} active={false} />
                </Link>
                <Link to="/setting">
                    <NavItem navSize={navSize} icon={FiSettings} title="Settings" description active={false} />
                </Link>
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                {showDarkModeButton && ( 
                    <FormControl display="flex" alignItems="center" mb="3" p="2">
                        <FormLabel htmlFor="dark_mode" mb="0">
                            Enable Dark Mode?
                        </FormLabel>
                        <Switch
                            id="dark_mode"
                            color={buttonColor}
                            size="lg"
                            isChecked={colorMode === "dark"}
                            onChange={toggleColorMode}
                        />
                    </FormControl>
                )}
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">UFF</Heading>
                        <Text color="gray">Corporation</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Sidebar;
