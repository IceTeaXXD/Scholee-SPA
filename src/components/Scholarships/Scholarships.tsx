/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
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

import { Link } from "react-router-dom"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { FaFilter } from "react-icons/fa"
import { createColumnHelper } from "@tanstack/react-table"
import { FiEdit } from "react-icons/fi"
import { CheckIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons"
import { debounce } from "lodash"
import { DataTable } from "./DataTable"
import axios from "axios"

const Scholarships: React.FC = () => {
  type Scholarship = {
    id: Number
    title: String
    description: String
    scholarshiptype: String
    coverage: Number
    action: JSX.Element
  }

  const columnHelper = createColumnHelper<(typeof scholarships)[0]>()

  const columns = [
    columnHelper.accessor("title", {
      cell: (info: any) => info.getValue(),
      header: "Title"
    }),
    columnHelper.accessor("description", {
      cell: (info: any) => info.getValue(),
      header: "Description"
    }),
    columnHelper.accessor("scholarshiptype", {
      cell: (info: any) => info.getValue(),
      header: "Type"
    }),
    columnHelper.accessor("coverage", {
      cell: (info: any) => info.getValue(),
      header: "Coverage",
      meta: {
        isNumeric: true
      }
    }),
    columnHelper.accessor("action", {
      cell: (info: any) => info.getValue(),
      header: ""
    })
  ]

  // Fetch Scholarships
  const fetchScholarships = async () => {
    try {
      const api_url = new URL(
        process.env.REACT_APP_API_URL + "/api/scholarship"
      )
      const params = new URLSearchParams()
      params.append("title", search)
      params.append("minCoverage", minCoverage)
      params.append("maxCoverage", maxCoverage)
      params.append("itemsPerPage", itemsPerPage.toString())
      params.append("types", selectedTypes.join(","))
      params.append("currentPage", currentPage.toString())
      api_url.search = params.toString()

      const response = await axios.get(api_url.toString())

      if (!response) {
        throw new Error("Error fetching scholarships.")
      }

      const jsonData = await response.data
      const data = jsonData.data
      setNumberOfPages(jsonData.numberOfPages)
      const scholarships_data = data.map((scholarship: any) => ({
        title: scholarship.title,
        description: scholarship.description,
        scholarshiptype: scholarship.type
          .map((type: any) => type.type)
          .join(", "),
        coverage: `$${scholarship.coverage}`,
        action: (
          <Stack direction="row" spacing={2}>
            <Link to={`/${scholarship.scholarship_id}/acceptance`}>
              <Button
                variant="ghost"
                colorScheme="green"
                size="sm"
                leftIcon={<Icon as={CheckIcon} />}
              >
                Acceptance
              </Button>
            </Link>
            <Link to={`/${scholarship.scholarship_id}/assignments`}>
              <Button
                variant="ghost"
                colorScheme="blue"
                size="sm"
                leftIcon={<Icon as={FiEdit} />}
              >
                Assignments
              </Button>
            </Link>
          </Stack>
        )
      }))
      setScholarships(scholarships_data)
    } catch (err: any) {
      return console.error(err.message)
    }
  }

  const fetchScholarshipTypes = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/scholarshiptype"
      )

      if (!response) {
        throw new Error("Error fetching scholarship types.")
      }

      const jsonData = await response.data
      const types = jsonData.data
      setScholarshipTypes(types)
    } catch (err: any) {
      return console.error(err.message)
    }
  }

  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [numberOfPages, setNumberOfPages] = useState(0)
  const [scholarshipTypes, setScholarshipTypes] = useState<string[]>([])
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [minCoverage, setMinCoverage] = useState("0")
  const [maxCoverage, setMaxCoverage] = useState("0")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const format = (val: any) => `$` + val
  const parse = (val: any) => val.replace(/^\$/, "")
  const MAX_PAGE_BUTTONS = 3
  const startPage =
    currentPage <= Math.floor(MAX_PAGE_BUTTONS / 2)
      ? 1
      : Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2))
  const endPage =
    startPage + MAX_PAGE_BUTTONS - 1 <= numberOfPages
      ? startPage + MAX_PAGE_BUTTONS - 1
      : numberOfPages

  const debouncedFetch = debounce(fetchScholarships, 500)

  useEffect(() => {
    const delayedFetch = () => {
      debouncedFetch()
    }
    setCurrentPage(1)
    const delay = setTimeout(delayedFetch, 500)
    return () => clearTimeout(delay)
  }, [search, minCoverage, maxCoverage])

  useEffect(() => {
    setCurrentPage(1)
    fetchScholarships()
  }, [itemsPerPage, selectedTypes])

  useEffect(() => {
    fetchScholarships()
  }, [currentPage])

  useEffect(() => {
    fetchScholarshipTypes()
  }, [])

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
            onChange={(event) => setSearch(event.target.value)}
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
              onChange={(values) => {
                if (Array.isArray(values)) {
                  setSelectedTypes(values)
                } else {
                  setSelectedTypes([values])
                }
              }}
            >
              {scholarshipTypes.map((type) => (
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
              defaultValue="5"
              onChange={(value) => setItemsPerPage(Number(value))}
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
                onChange={(valueString) => setMinCoverage(parse(valueString))}
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
                onChange={(valueString) => setMaxCoverage(parse(valueString))}
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
        <DataTable data={scholarships} columns={columns} />
      </Box>

      {scholarships.length > 0 && (
        <HStack spacing="24px" justifyContent="center" mt={"20px"}>
          {/* Prev Button */}
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
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
              colorScheme={currentPage === pageNumber ? "teal" : "gray"}
              borderRadius="full"
              w="40px"
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </Button>
          ))}

          {/* Next Button */}
          <Button onClick={() => setCurrentPage(currentPage + 1)}>
            <Icon as={ArrowForwardIcon} />
          </Button>
        </HStack>
      )}
    </Box>
  )
}

export default Scholarships
