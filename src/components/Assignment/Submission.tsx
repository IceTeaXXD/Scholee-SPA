import { Box, Text, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Flex, ButtonGroup, IconButton, useEditableControls, Editable, EditableInput, EditablePreview, Input, Tooltip } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/axiosPrivate";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

interface FileDetails {
  file_id: number
  file_path: string
  user_id_student: number
  score : number
}

interface UserDetails {
  userId: number
  name: string
  email: string
}

export const Submissions = () => {
  const [value, setValue] = useState("1");
  const axiosInstance = useAxiosPrivate()

  const useFetchFile = (sid: any, aid: any) => {
    const [submissionFile, setSubmissionFile] = useState<FileDetails[]>([])
    const [userDetailsArray, setUserDetailsArray] = useState<UserDetails[]>([])

    const FILE_URL =
      process.env.REACT_APP_API_URL +
      `/api/files/scholarship/${sid}/assignment/${aid}`
    const fetchFile = async () => {
      try {
        const response = await axiosInstance.get(FILE_URL)
        setSubmissionFile(response.data.data.files)

        const userDetailsPromises = response.data.data.files.map(
          async (file: FileDetails) => {
            try {
              const userInfo = await axios.get(
                process.env.REACT_APP_API_URL +
                  `/api/user/` +
                  file.user_id_student
              )
              return {
                userId: file.user_id_student,
                name: userInfo.data.data.user.name,
                email: userInfo.data.data.user.email
              }
            } catch (error: any) {
              console.error(
                `Error fetching user details for user_id_student ${file.user_id_student}:`,
                error.message
              )
              return null
            }
          }
        )

        const userDetailsArray = await Promise.all(userDetailsPromises)
        setUserDetailsArray(
          userDetailsArray.filter((user) => user !== null) as UserDetails[]
        )
      } catch (error) {
        setSubmissionFile([])
      }
    }

    return { submissionFile, userDetailsArray, fetchFile }
  }
  const { scholarshipid, assignmentid } = useParams()
  const { submissionFile, userDetailsArray, fetchFile } = useFetchFile(
    scholarshipid,
    assignmentid
  )

  useEffect(() => {
    fetchFile()
  }, [scholarshipid, assignmentid])

  function EditableControls({
    scholarshipId,
    assignmentId,
    fileId,
    userId,
  }: {
    scholarshipId: number;
    assignmentId: number;
    fileId: number;
    userId: number;
  }) {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" w="full">
        <IconButton
          icon={<CheckIcon />}
          aria-label="Submit"
          {...getSubmitButtonProps({
            onClick: async () => {
              try {
                // Make a PATCH request to update the score
                await axios.patch(
                  `${process.env.REACT_APP_API_URL}/api/files/scholarship/${scholarshipId}/assignment/${assignmentId}`,
                  { score: value, fid: fileId }
                );
              } catch (error : any) {
                console.error("Error updating score:", error.message);
              }
            },
          })}
        />
        <IconButton
          icon={<CloseIcon boxSize={3} />}
          aria-label="Cancel"
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : null;
  }
  return (
    <Accordion allowMultiple>
      {submissionFile.map((file, index) => (
        <AccordionItem key={index}>
          <Box>
            <AccordionButton>
              <Flex justify="space-between" align="center" w="100%">
                {/* Editable Component */}
                {userDetailsArray[index] && (
                  <Box p="4">
                    <Text fontWeight="bold" marginBottom="2">
                      Name: {userDetailsArray[index].name}
                    </Text>
                  </Box>
                )}
                {/* Accordion Icon */}
                <AccordionIcon />
              </Flex>
            </AccordionButton>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Text fontWeight="bold" mr="5">
                {" "}
                Grade:{" "}
              </Text>
              <Editable
                defaultValue={file.score?.toString() || "1"}
                isPreviewFocusable={true}
                selectAllOnFocus={false}
                maxWidth="300px"
                onSubmit={(nextValue) => {
                  const num = Number(nextValue);
                  if (num < 1 || num > 100 || isNaN(num)) {
                    setValue("1");
                    console.log("value",value)
                    return "1";
                  } else {
                    setValue(nextValue)
                    console.log(nextValue)
                    return nextValue;
                  }
                }}
              >
                <Tooltip label="Click to edit" shouldWrapChildren={true}>
                  <EditablePreview
                    _hover={{
                      background: "gray.100",
                    }}
                  />
                </Tooltip>
                <Flex>
                  <Input as={EditableInput} />
                  <EditableControls
                    scholarshipId={Number(scholarshipid)}
                    assignmentId={Number(assignmentid)}
                    fileId={file.file_id}
                    userId={file.user_id_student}
                  />
                </Flex>
              </Editable>
            </Box>
          </Box>

          <AccordionPanel>
            <iframe
              title={`Google Drive Viewer ${index}`}
              src={file.file_path}
              width="100%"
              height="700px"
            ></iframe>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};