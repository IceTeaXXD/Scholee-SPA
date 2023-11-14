import {
  Box,
  Button,
  ButtonGroup,
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
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { FiEdit } from "react-icons/fi"
import { useParams } from "react-router-dom"
import axios from "../../api/axios"
import { Field, Form, Formik } from "formik"
import { AssignmentCards, AssignmentCardsProps } from "./AssignmentCards"

interface CreateAssignmentModalProps {
  afterCreate: () => void;
}

const useFetchAssignments = () => {
  console.log("useFetchAssignments")
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

function CreateAssignmentModal({ afterCreate }: CreateAssignmentModalProps) {
  const { scholarshipid } = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = React.useState(<ModalOverlay />)
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
      afterCreate()
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

const AssignmentDetails = () => {
  const { assignments, fetchAssignments } = useFetchAssignments()
  const [shouldFetchAssignments, setShouldFetchAssignments] = useState(true);

  useEffect(() => {
    if (shouldFetchAssignments) {
      fetchAssignments();
      setShouldFetchAssignments(false);
    }
  }, [fetchAssignments, shouldFetchAssignments]);

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
        <CreateAssignmentModal 
          afterCreate={() => setShouldFetchAssignments(true)}
        />
        {assignments.length > 0 ? (
          assignments.map((assignment: AssignmentCardsProps, index: any) => (
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
