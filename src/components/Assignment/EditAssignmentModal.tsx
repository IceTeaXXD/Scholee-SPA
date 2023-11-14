/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast
} from "@chakra-ui/react"
import axios from "axios"
import { Form, Formik, Field } from "formik"
import { FiEdit } from "react-icons/fi"
interface EditAssignmentModalProps {
  isOpen: boolean
  onClose: () => void
  scholarship_id: Number
  assignment_id: Number
  onEditSuccess: () => void
}

export const EditAssignmentModal: React.FC<EditAssignmentModalProps> = ({
  isOpen,
  onClose,
  scholarship_id,
  assignment_id,
  onEditSuccess
}) => {
  const toast = useToast()
  const [assignmentName, setAssignmentName] = React.useState("")
  const [assignmentDescription, setAssignmentDescription] = React.useState("")

  async function GetAssignment() {
    try {
      const URL =
        process.env.REACT_APP_API_URL +
        "/api/assignment/" +
        scholarship_id +
        "/" +
        assignment_id
      const response = await axios.get(URL)
      console.log(response)
      setAssignmentName(response.data.data.assignment_name)
      setAssignmentDescription(response.data.data.assignment_description)
    } catch (error) {
      console.error("Error fetching assignment:", error)
    }
  }

  async function EditAssignment() {
    try {
      const URL =
        process.env.REACT_APP_API_URL +
        "/api/assignment/" +
        scholarship_id +
        "/" +
        assignment_id
      const response = await axios.patch(URL, {
        name: assignmentName,
        desc: assignmentDescription
      })
      setAssignmentName(response.data.data.assignment_name)
      setAssignmentDescription(response.data.data.assignment_description)
      onClose()
      onEditSuccess()
      toast({
        title: "Assignment updated.",
        description: "Assignment has been successfully updated.",
        status: "success",
        duration: 9000,
        isClosable: true
      })
    } catch (error) {
      console.error("Error deleting assignment:", error)
    }
  }

  function validateField(value: any) {
    if (assignmentName === "") {
      return "Assignment name cannot be empty"
    }
    if (assignmentDescription === "") {
      return "Assignment description cannot be empty"
    }
  }

  // when the modal is opened, fetch the assignment
  useEffect(() => {
    if (isOpen) {
      GetAssignment()
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={{
          name: assignmentName,
          description: assignmentDescription
        }}
        onSubmit={(values, actions) => {
          EditAssignment()
          actions.setSubmitting(false)
        }}
      >
        {(props) => (
          <Form>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Assignment</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
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
                        onChange={(e) => {
                          setAssignmentName(e.target.value)
                        }}
                        value={assignmentName}
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

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
                        onChange={(e) => {
                          setAssignmentDescription(e.target.value)
                        }}
                        value={assignmentDescription}
                      />
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    props.handleSubmit()
                  }}
                  leftIcon={<Icon as={FiEdit} />}
                >
                  Edit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
