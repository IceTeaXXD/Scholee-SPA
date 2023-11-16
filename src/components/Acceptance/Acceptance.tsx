import { useEffect, useState } from "react";
import {
  Button,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Heading,
  Stack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { Search2Icon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import axios from "axios";

const Acceptance = () => {
    const { scholarshipid } = useParams()
    const [applicants, setApplicants] = useState([])
    const [students, setStudents] = useState<JSX.Element[]>([])
    const [selectedID, setSelectedID] = useState(0)

    /* Get all applicant */
    const urlApplicant = new URL(process.env.REACT_APP_API_URL + "/api/scholarship/user/" + scholarshipid)    
    const fetchApplicant = async () => {
        const applicantsResponse = await axios.get(urlApplicant.toString())
        setApplicants(applicantsResponse.data.data.scholarships)

        /* Fetch the names of the students */
        const studentPromises = applicants.map(async (applicant: any) => {
            const studentURL = new URL(process.env.REACT_APP_API_URL + "/api/user/" + applicant.user_id_student)
            const studentResponse = await axios.get(studentURL.toString())
            return {
                user_id: applicant.user_id_student,
                name: studentResponse.data.data.user.name,
                email: studentResponse.data.data.user.email,
                status: applicant.status
            }
        })

        const studentNames = await Promise.all(studentPromises)

        const studentProp = studentNames.map((student) => (
            <Tr key={student.user_id}>
                <Td>{student.name}</Td>
                <Td>{student.email}</Td>
                <Td>
                    {String(student.status) === "waiting" ? (
                        <>
                            <Button
                                variant="ghost"
                                colorScheme="green"
                                leftIcon={<Icon as={CheckIcon} />}
                                onClick={() => acceptAction(student.user_id)}
                            >
                                Accept
                            </Button>
                            <Button
                                variant="ghost"
                                colorScheme="red"
                                leftIcon={<Icon as={CloseIcon} />}
                                onClick={() => rejectAction(student.user_id)}
                            >
                                Reject
                            </Button>
                        </>
                    ) : (
                        student.status
                    )}
                </Td>
            </Tr>
        ));

        setStudents(studentProp)
    }

    useEffect(() => {
        fetchApplicant()
    }, [scholarshipid]);

    const toast = useToast();
    const { isOpen: acceptModalIsOpen, onOpen: onAcceptModalOpen, onClose: onAcceptModalClose } = useDisclosure();
    const { isOpen: rejectModalIsOpen, onOpen: onRejectModalOpen, onClose: onRejectModalClose } = useDisclosure();

    const acceptAction = (userID: number) => {
        setSelectedID(userID)
        onAcceptModalOpen();
    };

    const rejectAction = (userID: number) => {
        setSelectedID(userID)
        onRejectModalOpen();
    };

    const handleAcceptConfirm = () => {
        const url = new URL(process.env.REACT_APP_API_URL + `/api/scholarship/acceptance/${scholarshipid}`)
        console.log(url.toString())
        axios.post(url.toString(), {
            "status": "accepted",
            "user_id": Number(selectedID)
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
        console.log(error);
        });

        toast({
        title: "Acceptance set",
        description: "This applicant has been accepted",
        status: "success",
        duration: 9000,
        isClosable: true,
        });
        onAcceptModalClose();
    };

    const handleRejectConfirm = () => {
        const url = new URL(process.env.REACT_APP_API_URL + `/api/scholarship/acceptance/${scholarshipid}`)
        axios.post(url.toString(), {
            "status": "rejected",
            "user_id": Number(selectedID)
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
        console.log(error);
        });
        toast({
        title: "Rejection set",
        description: "This applicant has been rejected",
        status: "success",
        duration: 9000,
        isClosable: true,
        });
        onRejectModalClose();
    };

    return (
        <Box>
        <Heading>Scholarship Acceptance</Heading>
        <Stack>
            {/* Search Bar */}
            <InputGroup borderRadius={10} size="sm">
            <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.600" />} />
            <Input type="text" borderRadius={10} placeholder="Search Name..." border="1px solid #949494" />
            </InputGroup>
        </Stack>
        <Box>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                    <Tr>
                        <Th>Student Name</Th>
                        <Th>Email</Th>
                        <Th>Status</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {students}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>

        {/* Accept Confirmation Modal */}
        <Modal isOpen={acceptModalIsOpen} onClose={onAcceptModalClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Confirm Acceptance</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Are you sure you want to accept this applicant?
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="green" mr={3} onClick={handleAcceptConfirm}>
                Confirm
                </Button>
                <Button variant="ghost" onClick={onAcceptModalClose}>
                Cancel
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>

        {/* Reject Confirmation Modal */}
        <Modal isOpen={rejectModalIsOpen} onClose={onRejectModalClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Confirm Rejection</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Are you sure you want to reject this applicant?
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={handleRejectConfirm}>
                Confirm
                </Button>
                <Button variant="ghost" onClick={onRejectModalClose}>
                Cancel
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </Box>
    );
    };

    export default Acceptance;