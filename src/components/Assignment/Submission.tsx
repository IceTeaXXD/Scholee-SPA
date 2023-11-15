import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface FileDetails {
  file_id: number;
  file_path: string;
  user_id_student: number;
}

interface UserDetails {
  userId: number;
  name: string;
  email: string;
}

const useFetchFile = (sid: any, aid: any) => {
  const [submissionFile, setSubmissionFile] = useState<FileDetails[]>([]);
  const [userDetailsArray, setUserDetailsArray] = useState<UserDetails[]>([]);

  const FILE_URL = process.env.REACT_APP_API_URL + `/api/files/scholarship/${sid}/assignment/${aid}`;

  const fetchFile = async () => {
    try {
      const response = await axios.get(FILE_URL);
      console.log(response.data.data.files);
      setSubmissionFile(response.data.data.files);

      const userDetailsPromises = response.data.data.files.map(async (file: FileDetails) => {
        try {
          const userInfo = await axios.get(
            process.env.REACT_APP_API_URL + `/api/user/` + file.user_id_student
          );
          return {
            userId: file.user_id_student,
            name: userInfo.data.data.user.name,
            email: userInfo.data.data.user.email,
          };
        } catch (error: any) {
          console.error(
            `Error fetching user details for user_id_student ${file.user_id_student}:`,
            error.message
          );
          return null;
        }
      });

      const userDetailsArray = await Promise.all(userDetailsPromises);
      setUserDetailsArray(userDetailsArray.filter((user) => user !== null) as UserDetails[]);
    } catch (error) {
      setSubmissionFile([]);
    }
  };

  return { submissionFile, userDetailsArray, fetchFile };
};

export const Submissions = () => {
  const { scholarshipid, assignmentid } = useParams();
  const { submissionFile, userDetailsArray, fetchFile } = useFetchFile(
    scholarshipid,
    assignmentid
  );

  useEffect(() => {
    fetchFile();
  }, [scholarshipid, assignmentid]);

  return (
    <div>
        {submissionFile.map((file, index) => (
            <Box key={index} marginBottom="4" width="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <iframe
                    title={`Google Drive Viewer ${index}`}
                    src={file.file_path}
                    width="100%"
                    height="700px"
                ></iframe>
                {userDetailsArray[index] && (
                    <Box p="4">
                        <Text fontWeight="bold" marginBottom="2">Name: {userDetailsArray[index].name}</Text>
                        <Text>Email: {userDetailsArray[index].email}</Text>
                    </Box>
                )}
            </Box>
        ))}
    </div>
  );
};
