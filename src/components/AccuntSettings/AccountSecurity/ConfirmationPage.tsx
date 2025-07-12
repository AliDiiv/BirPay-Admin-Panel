import {
    Box,
    Text,
    Icon,
    Button,
    VStack,
    useColorModeValue,
    Flex,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import SidebarTabs from '../SidebarTabs';

const ConfirmationPage = () => {
    const textColor = useColorModeValue('gray.700', 'gray.100');
    const bg = useColorModeValue('white', '#021726')
    return (
        <Flex direction={{ base: 'column', md: 'row' }} p={4} minH="50vh" gap={4}>
            <SidebarTabs />
            <Box
                bg={bg}
                w="100%"
                minH="50vh"
                borderRadius="lg"
                display="flex"
                justifyContent="center"
                flexDirection="column"
                textAlign="center"
            >
                <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={6}>
                    پذیرندگی
                </Text>

                <VStack spacing={6} maxW="lg" mx="auto">
                    <Icon as={CheckCircleIcon} boxSize={20} color="green.400" />

                    <Text fontSize={{ base: "md", md: "xl" }} color={textColor}>
                        از اینکه اطلاعات خود را وارد نموده‌اید ممنونیم.
                    </Text>

                    <Box>
                        <Text fontSize="sm" color="gray.600" mb={2}>
                            وضعیت فرم پذیرش‌گری شما
                        </Text>

                        <Button colorScheme="green" variant="outline" size="sm" borderRadius="full">
                            تایید شده
                        </Button>

                        <Text fontSize="xs" mt={2} color="gray.500">
                            است.
                        </Text>
                    </Box>
                </VStack>
            </Box>
        </Flex>









    );
};

export default ConfirmationPage;
