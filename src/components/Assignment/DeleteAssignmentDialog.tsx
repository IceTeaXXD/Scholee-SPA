import React from "react"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast
} from "@chakra-ui/react"
import useAxiosPrivate from "../../hooks/axiosPrivate"

interface DeleteAlertDialogProps {
  isOpen: boolean
  onClose: () => void
  scholarship_id: Number
  assignment_id: Number
  onDeleteSuccess: () => void
}

export const DeleteAssignmentDialog: React.FC<DeleteAlertDialogProps> = ({
  isOpen,
  onClose,
  scholarship_id,
  assignment_id,
  onDeleteSuccess
}) => {
  const axiosInstance = useAxiosPrivate()
  const toast = useToast()
  async function DeleteAssignment() {
    try {
      const URL =
        process.env.REACT_APP_API_URL +
        "/api/assignment/" +
        scholarship_id +
        "/" +
        assignment_id
      const response = await axiosInstance.delete(URL)
      console.log(response)
      onClose()
      onDeleteSuccess()
      toast({
        title: "Assignment deleted.",
        description: "Assignment has been successfully deleted.",
        status: "warning",
        duration: 9000,
        isClosable: true
      })
    } catch (error) {
      console.error("Error deleting assignment:", error)
    }
  }
  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={React.useRef<any>()}
      isCentered
      motionPreset="slideInBottom"
    >
      <AlertDialogOverlay sx={{ backdropFilter: "blur(10px)" }}>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Assignment
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="red" onClick={DeleteAssignment}>
              Delete
            </Button>
            <Button onClick={onClose} ml={3}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
