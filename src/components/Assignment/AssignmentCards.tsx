import { ViewIcon } from "@chakra-ui/icons"
import {
  useColorModeValue,
  chakra,
  Stack,
  Button,
  Icon,
  Box
} from "@chakra-ui/react"
import React from "react"
import { FiEdit } from "react-icons/fi"
import { Link } from "react-router-dom"

interface AssignmentCardsProps {
  index: Number
  scholarship_id: Number
  assignment_id: Number
  assignment_name: string
  assignment_description: string
}

export const AssignmentCards: React.FC<AssignmentCardsProps> = (props) => {
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
