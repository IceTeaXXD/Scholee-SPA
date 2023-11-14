import {
  Button,
  ButtonGroup,
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
  Spacer,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast
} from "@chakra-ui/react"
import React from "react"
import { FiEdit } from "react-icons/fi"
import { useParams } from "react-router-dom"
import axios from "../../api/axios"
import { Field, Form, Formik } from "formik"

interface CreateAssignmentModalProps {
  afterCreate: () => void
}

export const CreateAssignmentModal = ({
  afterCreate
}: CreateAssignmentModalProps) => {
  const { scholarshipid } = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = React.useState(<ModalOverlay />)
  function validateField(value: any) {
    if (!value) {
      return "Field is required"
    }
  }
  const toast = useToast()
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
      toast({
        title: "Assignment created.",
        description: "New assignment has been successfully created.",
        status: "success",
        duration: 9000,
        isClosable: true
      })
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
