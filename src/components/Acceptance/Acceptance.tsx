import React, { useState } from "react";
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

const Acceptance = () => {
  const { scholarshipid } = useParams();
  const toast = useToast();
  const { isOpen: acceptModalIsOpen, onOpen: onAcceptModalOpen, onClose: onAcceptModalClose } = useDisclosure();
  const { isOpen: rejectModalIsOpen, onOpen: onRejectModalOpen, onClose: onRejectModalClose } = useDisclosure();

  const acceptAction = () => {
    onAcceptModalOpen();
  };

  const rejectAction = () => {
    onRejectModalOpen();
  };

  const handleAcceptConfirm = () => {
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
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Nomen</Td>
                <Td>nomen@gmail.com</Td>
                <Td>
                  <Button variant="ghost" colorScheme="green" leftIcon={<Icon as={CheckIcon} />} onClick={acceptAction}>
                    Accept
                  </Button>
                  <Button variant="ghost" colorScheme="red" leftIcon={<Icon as={CloseIcon} />} onClick={rejectAction}>
                    Reject
                  </Button>
                </Td>
              </Tr>
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
