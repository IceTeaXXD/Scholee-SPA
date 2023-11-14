import { Flex, Box, Text, Heading, TableContainer, Table, Th, Thead, Tr, Tbody, Td } from "@chakra-ui/react"
import axios from "axios";
import { useState, useEffect } from "react";
import { handleGetInfo } from "../../utils/auth";

const Report = () => {
  const [userInfo, setUserInfo] = useState({
    user_id: 0,
    name: "",
    email: "",
    role: ""
  });

  const [students, setStudents] = useState([])

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await handleGetInfo();
        setUserInfo({
          user_id: response?.data.user_id,
          name: response?.data.name,
          email: response?.data.email,
          role: response?.data.roles
        });

        const students = await axios.get(
          process.env.REACT_APP_API_URL + "/api/university/stats/" + response?.data.user_id
        );

        setStudents(students.data.data)
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };

    getInfo();
  }, []);
  
  return (
    <Box p="12">
        <Heading size="sm" as="h1" mb="6" fontSize={48}>
          List of Students
        </Heading>
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
                  <Tr key={student}>
                    <Td>{student.applicant_name}</Td>
                    <Td>{student.applicant_email}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
    </Box>
    
  )
}

export default Report
