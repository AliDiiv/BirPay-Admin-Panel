import {
    Box,
    Text,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Flex,
    Icon,
    Divider,
    useColorModeValue,
} from '@chakra-ui/react';
import { MdComputer } from 'react-icons/md';
import SidebarTabs from '../SidebarTabs';

const DevicePanel = () => {
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const bg = useColorModeValue('white', '#021726')
    return (
        <Flex direction={{ base: 'column', md: 'row' }} p={4} minH="50vh" gap={4}>
            <SidebarTabs />
            <Box p={4} bg={bg} borderRadius="lg" boxShadow="md" w="100%">
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                    دستگاه‌ها
                </Text>

                <Tabs variant="enclosed">
                    <TabList>
                        <Tab _selected={{ color: 'blue.500' }}>فعلی</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Flex
                                p={4}
                                borderWidth="1px"
                                borderColor={borderColor}
                                borderRadius="md"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Flex alignItems="center" gap={3}>
                                    <Icon as={MdComputer} boxSize={6} />
                                    <Flex direction="column">
                                        <Text fontWeight="medium">Chrome | Windows</Text>
                                        <Text fontSize="sm" color="gray.500">
                                            آخرین دسترسی: لحظاتی پیش
                                        </Text>
                                        <Text fontSize="sm" color="gray.500">
                                            ساخته‌شده در: ۸ آذر ۱۴۰۳، ۱۲:۰۳
                                        </Text>
                                        <Text fontSize="sm" color="gray.400">
                                            192.15.190.197
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>

                            <Divider my={8} />

                            <Flex direction="column" alignItems="center" justifyContent="center" color="gray.500">
                                <Icon as={MdComputer} boxSize={12} mb={2} />
                                <Text>شما نشست فعال دیگری ندارید.</Text>
                            </Flex>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Flex>

    );
};

export default DevicePanel;
