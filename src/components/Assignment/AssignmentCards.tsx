import { DeleteIcon, ViewIcon } from "@chakra-ui/icons"
import {
  useColorModeValue,
  chakra,
  Stack,
  Icon,
  Box,
  IconButton,
  Tooltip,
  Heading,
  Text
} from "@chakra-ui/react"
import React from "react"
import { FiEdit } from "react-icons/fi"
import { Link } from "react-router-dom"
import { DeleteAssignmentDialog } from "./DeleteAssignmentDialog"
import { EditAssignmentModal } from "./EditAssignmentModal"

export interface AssignmentCardsProps {
  index: Number
  scholarship_id: Number
  assignment_id: Number
  assignment_name: string
  assignment_description: string
  onDeleteSuccess: () => void
  onEditSuccess: () => void
}

export const AssignmentCards = ({
  index,
  scholarship_id,
  assignment_id,
  assignment_name,
  assignment_description,
  onDeleteSuccess,
  onEditSuccess
}: AssignmentCardsProps) => {
  // TODO: SET THE APPLICANTS AND SUBMSISSIONS @MATTHEW MAHENDRA
  const [applicants, setApplicants] = React.useState(0)
  const [submissions, setSubmissions] = React.useState(0)
  const [isOpenEditAssignment, setIsOpenEditAssignment] = React.useState(false)
  const [isOpenDeleteAssignment, setIsOpenDeleteAssignment] =
    React.useState(false)
  const onCloseEditAssignment = () => setIsOpenEditAssignment(false)
  const onCloseDeleteAssignment = () => setIsOpenDeleteAssignment(false)
  const onEditAssignment = () => {
    setIsOpenEditAssignment(true)
  }
  const onDeleteAssignment = () => {
    setIsOpenDeleteAssignment(true)
  }

  return (
    <Box
      boxShadow={"lg"}
      width={"full"}
      rounded={"xl"}
      justifyContent={"center"}
      alignContent={"center"}
      minW={{ base: "90%", md: "450px" }}
      maxW={{ base: "90%", md: "900px" }}
      mx={"auto"}
      p={10}
      position={"relative"}
      bg={useColorModeValue("white", "gray.800")}
      textAlign={"left"}
    >
      <Heading
        fontSize={"2xl"}
        fontWeight={"bold"}
        color={useColorModeValue("gray.800", "white")}
        mt={2}
      >
        {assignment_name}
      </Heading>
      <Text
        color={useColorModeValue("gray.800", "white")}
        fontSize={"sm"}
        pt={4}
        textAlign={"justify"}
      >
        {assignment_description}
      </Text>
      <Stack
        direction={"row"}
        align="start"
        mt="1rem"
        justifyContent={"space-between"}
        spacing={"5"}
      >
        <Text fontWeight="bold" fontSize={14}>
          Submissions:{" "}
          <chakra.span fontWeight="medium" color="gray.500">
            {submissions} / {applicants}
          </chakra.span>
        </Text>
        <Stack direction="row" spacing="2">
          <Link
            to={`/scholarships/${scholarship_id}/assignments/${assignment_id}/submissions`}
          >
            <Tooltip label="View Submissions" aria-label="A tooltip">
              <IconButton
                aria-label="View Submissions"
                colorScheme="green"
                size="sm"
                icon={<Icon as={ViewIcon} />}
              />
            </Tooltip>
          </Link>
          <Tooltip label="Edit Assignment" aria-label="A tooltip">
            <IconButton
              aria-label="Edit Assignment"
              icon={<Icon as={FiEdit} />}
              colorScheme="blue"
              size="sm"
              onClick={onEditAssignment}
            />
          </Tooltip>
          <Tooltip label="Delete Assignment" aria-label="A tooltip">
            <IconButton
              aria-label="Delete Assignment"
              icon={<DeleteIcon />}
              colorScheme="red"
              size="sm"
              onClick={onDeleteAssignment}
            />
          </Tooltip>

          <EditAssignmentModal
            isOpen={isOpenEditAssignment}
            onClose={onCloseEditAssignment}
            scholarship_id={scholarship_id}
            assignment_id={assignment_id}
            onEditSuccess={onEditSuccess}
          />

          <DeleteAssignmentDialog
            isOpen={isOpenDeleteAssignment}
            onClose={onCloseDeleteAssignment}
            scholarship_id={scholarship_id}
            assignment_id={assignment_id}
            onDeleteSuccess={onDeleteSuccess}
          />
        </Stack>
      </Stack>
    </Box>
  )
}
