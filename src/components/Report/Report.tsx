/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Heading,
  TableContainer,
  Table,
  Th,
  Thead,
  Tr,
  Tbody,
  Td,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  MenuItemOption,
  MenuOptionGroup,
  Menu,
  Button,
  MenuButton,
  MenuList,
  HStack,
  Icon
} from "@chakra-ui/react"
import axios from "axios"
import React, { useState, useEffect } from "react"
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ChevronDownIcon,
  Search2Icon
} from "@chakra-ui/icons"
import { FaFilter } from "react-icons/fa"
import { debounce, get } from "lodash"
import useAxiosPrivate from "../../hooks/axiosPrivate"
import { handleGetInfo } from "../../utils/auth"

const Report: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    user_id: 0,
    name: "",
    email: "",
    role: ""
  });
  const axiosInstance = useAxiosPrivate()

  const [userId, setUserId] = useState(0);
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(0);
  const MAX_PAGE_BUTTONS = 3;

  const fetchStudents = async () => {
    const url = new URL(
      process.env.REACT_APP_API_URL + "/api/university/stats/" + userId
    );
    const params = new URLSearchParams();
    params.append("name", search);
    params.append("itemsperpage", String(itemsPerPage));
    params.append("currentPage", String(currentPage));
    console.log(params.toString());
    url.search = params.toString();
    const response = await axiosInstance.get(url.toString());
    const students = await response.data;
    setNumberOfPages(Math.ceil(students.data.total / itemsPerPage || 100));
    setStudents(students.data.data);
  };

  const debounceFetch = debounce(fetchStudents, 500);

  useEffect(() => {
    const getInfoAndFetchStudents = async () => {
      const response = await handleGetInfo();
      setUserInfo({
        user_id: response?.data.user_id,
        name: response?.data.name,
        email: response?.data.email,
        role: response?.data.roles
      });

      if (userId === 0 && response?.data.user_id !== 0) {
        setUserId(response?.data.user_id);
      }

      debounceFetch();
    };

    getInfoAndFetchStudents();
  }, [search, itemsPerPage, currentPage, userId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage])

  const startPage =
    currentPage <= Math.floor(MAX_PAGE_BUTTONS / 2)
      ? 1
      : Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2))

  const endPage =
    startPage + MAX_PAGE_BUTTONS - 1 <= numberOfPages
      ? startPage + MAX_PAGE_BUTTONS - 1
      : numberOfPages

  return (
    <Box p="12">
      <Heading size="sm" as="h1" mb="6" fontSize={48}>
        List of Students
      </Heading>
      <Stack>
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
          </MenuList>
        </Menu>
      </Stack>
      <Box>
        <TableContainer>
          <Table variant="striped" colorScheme="facebook">
            <Thead>
              <Tr>
                <Th>Student Name</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {students.map((student: any) => (
                <Tr key={student.applicant_email}>
                  <Td>{student.applicant_name}</Td>
                  <Td>{student.applicant_email}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      {students.length > 0 && (
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
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            isDisabled={currentPage === numberOfPages}
          >
            <Icon as={ArrowForwardIcon} />
          </Button>
        </HStack>
      )}
    </Box>
  )
}

export default Report
