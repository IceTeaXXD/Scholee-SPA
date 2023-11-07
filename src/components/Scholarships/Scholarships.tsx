import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    Text,
    Stack,
    MenuButton,
    Menu,
    MenuList,
    MenuDivider,
    MenuItemOption,
    MenuOptionGroup,
    Input,
    InputGroup,
    InputLeftElement
} from "@chakra-ui/react"

import { FaFilter } from "react-icons/fa"

// Use Chakra Ui for create a custom component for display field data in table

// Recommended for icons
import { Table, createColumn } from "react-chakra-pagination"
import { FiEdit, FiUser } from "react-icons/fi"
import { CheckIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons"
import { debounce } from "lodash"

type User = {
    id: number
    name: string
    email: string
    phone: string
    birthday: string
    avatar_url: string
}

const users: User[] = [
    {
        id: 1,
        name: "Carlin Gwinn",
        email: "cgwinn0@buzzfeed.com",
        phone: "(684) 9842794",
        birthday: "04/11/2009",
        avatar_url:
            "https://robohash.org/assumendanihilodio.png?size=50x50&set=set1"
    },
    {
        id: 2,
        name: "Yetta Snape",
        email: "ysnape1@princeton.edu",
        phone: "(645) 8617506",
        birthday: "06/08/1989",
        avatar_url:
            "https://robohash.org/liberorationequasi.png?size=50x50&set=set1"
    },
    {
        id: 3,
        name: "Letti Shingfield",
        email: "lshingfield2@sogou.com",
        phone: "(465) 1994297",
        birthday: "06/02/2004",
        avatar_url: "https://robohash.org/quiquidolorem.png?size=50x50&set=set1"
    },
    {
        id: 4,
        name: "Edsel Glencrash",
        email: "eglencrash3@mlb.com",
        phone: "(716) 4216591",
        birthday: "10/19/1994",
        avatar_url:
            "https://robohash.org/voluptasnoneum.png?size=50x50&set=set1"
    },
    {
        id: 5,
        name: "Kaleb Panter",
        email: "kpanter4@deliciousdays.com",
        phone: "(645) 9393804",
        birthday: "12/24/2014",
        avatar_url:
            "https://robohash.org/blanditiisdoloribuslibero.png?size=50x50&set=set1"
    },
    {
        id: 6,
        name: "Andrei Pegrum",
        email: "apegrum5@vistaprint.com",
        phone: "(587) 1114510",
        birthday: "06/07/1983",
        avatar_url:
            "https://robohash.org/delectusvelvoluptas.png?size=50x50&set=set1"
    },
    {
        id: 7,
        name: "Kania Andreucci",
        email: "kandreucci6@aol.com",
        phone: "(346) 7306775",
        birthday: "09/03/1993",
        avatar_url:
            "https://robohash.org/utveritatismolestias.png?size=50x50&set=set1"
    },
    {
        id: 8,
        name: "Luz Showers",
        email: "lshowers7@cam.ac.uk",
        phone: "(571) 7061743",
        birthday: "05/30/1998",
        avatar_url:
            "https://robohash.org/liberomolestiaevel.png?size=50x50&set=set1"
    },
    {
        id: 9,
        name: "Danya Harbron",
        email: "dharbron8@yale.edu",
        phone: "(908) 5621872",
        birthday: "11/02/2003",
        avatar_url:
            "https://robohash.org/quoducimuscumque.png?size=50x50&set=set1"
    },
    {
        id: 10,
        name: "Alf Ibbotson",
        email: "aibbotson9@mozilla.com",
        phone: "(739) 4103240",
        birthday: "02/28/2007",
        avatar_url:
            "https://robohash.org/temporibussintmollitia.png?size=50x50&set=set1"
    },
    {
        id: 11,
        name: "Aurel McCamish",
        email: "amccamisha@soup.io",
        phone: "(352) 9149861",
        birthday: "03/13/1993",
        avatar_url:
            "https://robohash.org/laboreteneturut.png?size=50x50&set=set1"
    },
    {
        id: 12,
        name: "Jarrad Jerrans",
        email: "jjerransb@mail.ru",
        phone: "(568) 7793952",
        birthday: "05/25/1989",
        avatar_url:
            "https://robohash.org/voluptasoditrepellendus.png?size=50x50&set=set1"
    },
    {
        id: 13,
        name: "Adams Swyer-Sexey",
        email: "aswyersexeyc@meetup.com",
        phone: "(682) 4005822",
        birthday: "12/31/1984",
        avatar_url:
            "https://robohash.org/molestiaeatqueincidunt.png?size=50x50&set=set1"
    },
    {
        id: 14,
        name: "Gladi Coxhell",
        email: "gcoxhelld@sciencedaily.com",
        phone: "(321) 6811254",
        birthday: "10/21/2009",
        avatar_url:
            "https://robohash.org/perspiciatissitreprehenderit.png?size=50x50&set=set1"
    },
    {
        id: 15,
        name: "Felecia Yitzovicz",
        email: "fyitzovicze@cnet.com",
        phone: "(465) 9054540",
        birthday: "04/30/1982",
        avatar_url:
            "https://robohash.org/undevelitdolor.png?size=50x50&set=set1"
    }
]

const Scholarships = () => {
    // Formatter for each user
    const tableData = users.map((user) => ({
        name: (
            <Flex align="center">
                <Avatar
                    name={user.name}
                    src={user.avatar_url}
                    size="sm"
                    mr="4"
                />
                <Text>{user.name}</Text>
            </Flex>
        ),
        email: user.email,
        phone: user.phone,
        birthday: user.birthday,
        action: (
            <Stack direction="row" spacing={2}>
                <Button
                    variant="ghost"
                    colorScheme="green"
                    size="sm"
                    leftIcon={<Icon as={CheckIcon} />}
                >
                    Acceptance
                </Button>
                <Button
                    variant="ghost"
                    colorScheme="blue"
                    size="sm"
                    leftIcon={<Icon as={FiEdit} />}
                >
                    Assignments
                </Button>
            </Stack>
        )
    }))

    const columnHelper = createColumn<(typeof tableData)[0]>()

    const columns = [
        columnHelper.accessor("name", {
            cell: (info) => info.getValue(),
            header: "Name"
        }),
        columnHelper.accessor("email", {
            cell: (info) => info.getValue(),
            header: "Email"
        }),
        columnHelper.accessor("phone", {
            cell: (info) => info.getValue(),
            header: "Phone"
        }),
        columnHelper.accessor("birthday", {
            cell: (info) => info.getValue(),
            header: "Birthday"
        }),
        columnHelper.accessor("action", {
            cell: (info) => info.getValue(),
            header: ""
        })
    ]

    const handleInputChange = debounce((event: any) => {
        const inputValue = event.target.value
        console.log(inputValue)
    }, 1000)

    const ScholarshipTypes = ["Undergraduate", "Postgraduate", "PhD"]

    return (
        <Box p="12">
            <Heading size="sm" as="h3" mb="6">
                List of Scholarships
            </Heading>

            <Stack
                spacing={4}
                direction={{ base: "column", md: "row" }}
                align="center"
                m="1rem"
            >
                {/* Search Bar */}
                <InputGroup borderRadius={10} size="sm">
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.600" />}
                    />
                    <Input
                        type="text"
                        borderRadius={10}
                        placeholder="Search..."
                        border="1px solid #949494"
                        onChange={handleInputChange}
                    />
                </InputGroup>

                {/* Filter Menu */}
                <Menu closeOnSelect={false}>
                    <MenuButton
                        as={Button}
                        leftIcon={<FaFilter />}
                        rightIcon={<ChevronDownIcon />}
                        size={"md"}
                        minWidth={"150px"}
                    >
                        Filter
                    </MenuButton>
                    <MenuList minWidth="240px">
                        <MenuOptionGroup title="Coverage Order" type="radio">
                            <MenuItemOption value="asc">
                                Ascending
                            </MenuItemOption>
                            <MenuItemOption value="desc">
                                Descending
                            </MenuItemOption>
                        </MenuOptionGroup>
                        <MenuDivider />
                        <MenuOptionGroup title="Types" type="checkbox">
                            {ScholarshipTypes.map((type) => (
                                <MenuItemOption key={type} value={type}>
                                    {type}
                                </MenuItemOption>
                            ))}
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>
            </Stack>

            <Box mt="6">
                <Table
                    colorScheme="blue"
                    emptyData={{
                        icon: FiUser,
                        text: "Nobody is registered here."
                    }}
                    totalRegisters={12}
                    onPageChange={(page) => console.log(page)}
                    columns={columns}
                    data={tableData}
                />
            </Box>
        </Box>
    )
}

export default Scholarships
