import {
    Box,
    Button,
    Heading,
    Icon,
    Stack,
    MenuButton,
    Menu,
    MenuList,
    MenuDivider,
    MenuItemOption,
    MenuOptionGroup,
    Input,
    InputGroup,
    InputLeftElement,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    MenuGroup,
    HStack
} from "@chakra-ui/react"

import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"

import { FaFilter } from "react-icons/fa"

import { createColumn } from "react-chakra-pagination"
import { FiEdit } from "react-icons/fi"
import { CheckIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons"
import { debounce } from "lodash"
import React, { useState } from "react"
import { DataTable } from "./DataTable"

type Scholarship = {
    name: String
    description: String
    scholarshiptype: String
    coverage: Number
}

const scholarships: Scholarship[] = [
    {
        name: "Scholarship 1",
        description: "Description 1",
        scholarshiptype: "Undergraduate",
        coverage: 1000
    },
    {
        name: "Scholarship 2",
        description: "Description 2",
        scholarshiptype: "Postgraduate",
        coverage: 2000
    },
    {
        name: "Scholarship 3",
        description: "Description 3",
        scholarshiptype: "PhD",
        coverage: 3000
    },
    {
        name: "Scholarship 4",
        description: "Description 4",
        scholarshiptype: "Undergraduate",
        coverage: 4000
    },
    {
        name: "Scholarship 5",
        description: "Description 5",
        scholarshiptype: "Postgraduate",
        coverage: 5000
    },
    {
        name: "Scholarship 6",
        description: "Description 6",
        scholarshiptype: "PhD",
        coverage: 6000
    },
    {
        name: "Scholarship 7",
        description: "Description 7",
        scholarshiptype: "Undergraduate",
        coverage: 7000
    },
    {
        name: "Scholarship 8",
        description: "Description 8",
        scholarshiptype: "Postgraduate",
        coverage: 8000
    },
    {
        name: "Scholarship 9",
        description: "Description 9",
        scholarshiptype: "PhD",
        coverage: 9000
    },
    {
        name: "Scholarship 10",
        description: "Description 10",
        scholarshiptype: "Undergraduate",
        coverage: 10000
    },
    {
        name: "Scholarship 11",
        description: "Description 11",
        scholarshiptype: "Postgraduate",
        coverage: 11000
    },
    {
        name: "Scholarship 12",
        description: "Description 12",
        scholarshiptype: "PhD",
        coverage: 12000
    }
]

const tableData = scholarships.map((scholarship) => ({
    name: scholarship.name,
    description: scholarship.description,
    scholarshiptype: scholarship.scholarshiptype,
    coverage: `$${scholarship.coverage}`,
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
    columnHelper.accessor("description", {
        cell: (info) => info.getValue(),
        header: "Description"
    }),
    columnHelper.accessor("scholarshiptype", {
        cell: (info) => info.getValue(),
        header: "Type"
    }),
    columnHelper.accessor("coverage", {
        cell: (info) => info.getValue(),
        header: "Coverage",
        meta: {
            isNumeric: true
        }
    }),
    columnHelper.accessor("action", {
        cell: (info) => info.getValue(),
        header: ""
    })
]

const Scholarships: React.FC = () => {
    const ScholarshipTypes = ["Undergraduate", "Postgraduate", "PhD"]

    // Items per Page
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const handleItemsPerPageChange = (value: string | string[]) => {
        const selected = Array.isArray(value) ? value : [value]
        setItemsPerPage(Number(selected))
        setCurrentPage(1)
        console.log("Items per Page:", selected)
    }

    // Scholarship Types
    const [, setSelectedTypes] = useState<string[]>([])
    const handleTypesChange = (value: string | string[]) => {
        const selected = Array.isArray(value) ? value : [value]
        setSelectedTypes(selected)
        console.log("Selected Types:", selected)
    }

    // Coverage
    const format = (val: any) => `$` + val
    const parse = (val: any) => val.replace(/^\$/, "")
    const [minCoverage, setMinCoverage] = useState("0")
    const [maxCoverage, setMaxCoverage] = useState("0")

    // Search Bar
    const handleInputChange = debounce((event: any) => {
        const inputValue = event.target.value
        console.log(inputValue)
    }, 1000)

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const numberOfPages = Math.ceil(scholarships.length / itemsPerPage)
    const data = tableData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )
    const handlePrevButton = () => {
        setCurrentPage(currentPage - 1)
    }
    const handleNextButton = () => {
        setCurrentPage(currentPage + 1)
    }

    const MAX_PAGE_BUTTONS = 3

    const startPage =
        currentPage <= Math.floor(MAX_PAGE_BUTTONS / 2)
            ? 1
            : Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2))

    const endPage =
        startPage + MAX_PAGE_BUTTONS - 1 <= numberOfPages
            ? startPage + MAX_PAGE_BUTTONS - 1
            : numberOfPages

    console.log("Current Page:", currentPage)
    console.log("Number of Pages:", numberOfPages)

    const handlePageButtonClick = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

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
                        {/* Types Menu */}
                        <MenuOptionGroup
                            title="Types"
                            type="checkbox"
                            onChange={handleTypesChange}
                        >
                            {ScholarshipTypes.map((type) => (
                                <MenuItemOption key={type} value={type}>
                                    {type}
                                </MenuItemOption>
                            ))}
                        </MenuOptionGroup>
                        <MenuDivider />

                        {/* Items per Page */}
                        <MenuOptionGroup
                            title="Items per Page"
                            type="radio"
                            onChange={handleItemsPerPageChange}
                            defaultValue="5"
                        >
                            <MenuItemOption value="5">5</MenuItemOption>
                            <MenuItemOption value="10">10</MenuItemOption>
                            <MenuItemOption value="15">15</MenuItemOption>
                            <MenuItemOption value="20">20</MenuItemOption>
                        </MenuOptionGroup>
                        <MenuDivider />

                        {/* Coverage Max-Min Menu */}
                        <MenuGroup title="Minimum Coverage">
                            <NumberInput
                                id="min-coverage"
                                min={0}
                                defaultValue={0}
                                value={format(minCoverage)}
                                onChange={(valueString) =>
                                    setMinCoverage(parse(valueString))
                                }
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup title="Maximum Coverage">
                            <NumberInput
                                id="max-coverage"
                                min={0}
                                defaultValue={0}
                                value={format(maxCoverage)}
                                onChange={(valueString) =>
                                    setMaxCoverage(parse(valueString))
                                }
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </MenuGroup>
                    </MenuList>
                </Menu>
            </Stack>

            <Box mt="6">
                <DataTable data={data} columns={columns} />
            </Box>

            <HStack spacing="24px" justifyContent="center">
                {/* Prev Button */}
                <Button
                    onClick={() => handlePrevButton()}
                    isDisabled={currentPage === 1} // disable if on first page
                >
                    <Icon as={ArrowBackIcon} />
                </Button>

                {/* Page Buttons */}
                {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, index) => startPage + index
                ).map((pageNumber) => (
                    <Button
                        variant="outline"
                        colorScheme={
                            currentPage === pageNumber ? "teal" : "gray"
                        }
                        borderRadius="full"
                        w="40px"
                        key={pageNumber}
                        onClick={() => handlePageButtonClick(pageNumber)}
                    >
                        {pageNumber}
                    </Button>
                ))}

                {/* Next Button */}
                <Button
                    onClick={() => handleNextButton()}
                    isDisabled={currentPage === numberOfPages} // disable if on last page
                >
                    <Icon as={ArrowForwardIcon} />
                </Button>
            </HStack>
        </Box>
    )
}

export default Scholarships
