import { ViewIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  chakra,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { FiEdit } from "react-icons/fi"
import { Link, useParams } from "react-router-dom"
import axios from "../../api/axios"
import { handleGetInfo } from "../../utils/auth"

interface AssignmentCardsProps {
  index: Number
  scholarship_id: Number
  assignment_id: Number
  assignment_name: string
  assignment_description: string
}

function AssignmentCards(props: AssignmentCardsProps) {
  const [applicants, setApplicants] = React.useState(0)
  const [submissions, setSubmissions] = React.useState(0)
  const {
    scholarship_id,
    assignment_id,
    assignment_name,
    assignment_description
  } = props

  // TODO: SET THE APPLICANTS AND SUBMSISSIONS @MATTHEW MAHENDRA

  return (
    <Box
      boxShadow={"lg"}
      width={"full"}
      maxW={"1048px"}
      rounded={"xl"}
      p={10}
      position={"relative"}
      bg={useColorModeValue("white", "gray.800")}
      textAlign={"left"}
    >
      <chakra.h1
        fontSize={"2xl"}
        fontWeight={"bold"}
        color={useColorModeValue("gray.800", "white")}
        mt={2}
      >
        {assignment_name}
      </chakra.h1>
      <chakra.p fontWeight={"medium"} fontSize={"15px"} pb={4}>
        {assignment_description}
      </chakra.p>
      <Stack
        direction={{ base: "column", md: "row" }}
        align="center"
        m="1rem"
        justifyContent={"center"}
        spacing={"5"}
      >
        <chakra.p fontWeight={"bold"} fontSize={14}>
          Submissions:
          <chakra.span fontWeight={"medium"} color={"gray.500"}>
            {" "}
            {submissions} / {applicants}
          </chakra.span>
        </chakra.p>
        <Link
          to={`/scholarships/${scholarship_id}/assignments/${assignment_id}/submissions`}
        >
          <Button
            variant="ghost"
            colorScheme="green"
            size="sm"
            leftIcon={<Icon as={ViewIcon} />}
          >
            View Submissions
          </Button>
        </Link>
        <Link
          to={`/scholarships/${scholarship_id}/assignments/${assignment_id}/edit`}
        >
          <Button
            variant="ghost"
            colorScheme="blue"
            size="sm"
            leftIcon={<Icon as={FiEdit} />}
          >
            Edit Assignment
          </Button>
        </Link>
      </Stack>
    </Box>
  )
}

const AssignmentDetails = () => {
  let { assignmentid } = useParams()
  const [assignments, setAssignments] = React.useState([])

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const URL =
          process.env.REACT_APP_API_URL + "/api/assignment/" + assignmentid
        const response = await axios.get(URL)
        setAssignments(response.data.data)
      } catch (error) {
        console.error("Error fetching assignments:", error)
      }
    }

    fetchAssignments()
  }, [assignmentid])

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
      textAlign={"center"}
      pt={10}
      justifyContent={"center"}
      direction={"column"}
      width={"full"}
      overflow={"hidden"}
    >
      <Box width={{ base: "full", sm: "lg", lg: "xl" }} margin={"auto"}>
        <Heading size="sm" as="h1" fontSize={48}>
          List of Assignments
        </Heading>
      </Box>
      <SimpleGrid columns={1} spacing={"5"} mt={16} mb={10} mx={"auto"}>
        {assignments.length > 0 ? (
          assignments.map((assignment: any, index: any) => (
            <AssignmentCards
              key={index}
              index={index}
              assignment_id={assignment.assignment_id}
              scholarship_id={assignment.scholarship_id}
              assignment_name={assignment.assignment_name}
              assignment_description={assignment.assignment_description}
            />
          ))
        ) : (
          <Text>No Assignments 😍</Text>
        )}
      </SimpleGrid>
    </Flex>
  )
}

export default AssignmentDetails
