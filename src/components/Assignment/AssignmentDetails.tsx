import { ViewIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  ButtonGroup,
  chakra,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { FiEdit } from "react-icons/fi"
import { Link, useParams } from "react-router-dom"
import axios from "../../api/axios"
import { Field, Form, Formik } from "formik"

interface AssignmentCardsProps {
  index: Number
  scholarship_id: Number
  assignment_id: Number
  assignment_name: string
  assignment_description: string
}

const useFetchAssignments = () => {
  const [assignments, setAssignments] = useState([])
  const { scholarshipid } = useParams()

  const fetchAssignments = async () => {
    try {
      const URL =
        process.env.REACT_APP_API_URL + "/api/assignment/" + scholarshipid
      const response = await axios.get(URL)
      setAssignments(response.data.data)
    } catch (error) {
      console.error("Error fetching assignments:", error)
    }
  }

  return { assignments, fetchAssignments }
}

function CreateAssignmentModal() {
  const { scholarshipid } = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = React.useState(<ModalOverlay />)
  const { fetchAssignments } = useFetchAssignments()
  function validateField(value: any) {
    if (!value) {
      return "Field is required"
    }
  }
  const createAssignment = async (values: any, actions: any) => {
    try {
      const assignmentname = values.name
      const assignmentdescription = values.description

      const URL = process.env.REACT_APP_API_URL + "/api/assignment"
      await axios.post(URL, {
        scholarship_id: Number(scholarshipid),
        name: assignmentname,
        desc: assignmentdescription
      })
      actions.setSubmitting(false)
      fetchAssignments()
      onClose()
    } catch (error) {
      console.error("Error creating assignment:", error)
      actions.setSubmitting(false)
    }
  }

  return (
    <>
      <Button
        leftIcon={<Icon as={FiEdit} />}
        onClick={() => {
          setOverlay(
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
          )
          onOpen()
        }}
        _hover={{
          bg: "cyan.400",
          color: "white"
        }}
        bg={useColorModeValue("white", "gray.900")}
      >
        Create a new assignment
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Create a new assignment</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{ name: "", description: "" }}
            onSubmit={(values, actions) => {
              createAssignment(values, actions)
            }}
          >
            {(props) => (
              <Form>
                <ModalBody>
                  <Field name="name" validate={validateField}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel htmlFor="name">Assignment Name</FormLabel>
                        <Input
                          {...field}
                          id="name"
                          placeholder="Assignment Name"
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Spacer mt={4} />
                  <Field name="description" validate={validateField}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                      >
                        <FormLabel htmlFor="description">
                          Assignment Description
                        </FormLabel>
                        <Textarea
                          {...field}
                          id="description"
                          placeholder="Assignment Description"
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <ButtonGroup variant="outline" spacing="6">
                    <Button
                      colorScheme="teal"
                      isLoading={props.isSubmitting}
                      type="submit"
                      leftIcon={<Icon as={FiEdit} />}
                    >
                      Create
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ButtonGroup>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
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
  const { assignments, fetchAssignments } = useFetchAssignments()

  useEffect(() => {
    fetchAssignments()
  }, [fetchAssignments])

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
        <CreateAssignmentModal />
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
