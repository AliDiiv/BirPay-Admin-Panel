import {
    Box,
    Text,
    VStack,
    HStack,
    Switch,
    Divider,
    Tooltip,
    Icon,
    useColorModeValue,
    Flex
} from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'
import SidebarTabs from '../SidebarTabs'


const sections = [
    {
        title: 'ورود',
        items: [
            { label: 'پیامک', key: 'sms_login' },
            { label: 'تلگرام', key: 'telegram_login' }
        ]
    },
    {
        title: 'تراکنش درگاه پرداخت اینترنتی',
        items: [
            { label: 'پیامک', key: 'sms_tx', hasInfo: true },
            { label: 'تلگرام', key: 'telegram_tx' },
            { label: 'ایمیل', key: 'email_tx' },
        ]
    },
    {
        title: 'تسویه',
        items: [
            { label: 'پیامک', key: 'sms_settlement', hasInfo: true },
            { label: 'تلگرام', key: 'telegram_settlement' },
            { label: 'ایمیل', key: 'email_settlement' },
        ]
    },
    {
        title: 'تیکت',
        items: [
            { label: 'پیامک', key: 'sms_ticket' },
            { label: 'تلگرام', key: 'telegram_ticket' },
            { label: 'ایمیل', key: 'email_ticket' },
        ]
    }
]

export default function NotificationSettings() {
    const bg = useColorModeValue('white', '#021726')
    const switchColor = useColorModeValue('blue', 'teal')

    return (
        <Flex direction={{ base: 'column', md: 'row' }} p={4} minH="50vh" gap={4}>
            <SidebarTabs />
            <Box bg={bg} p={6} borderRadius="lg" boxShadow="md">
                <Text fontSize="lg" fontWeight="bold" mb={6}>
                    تنظیمات اعلان
                </Text>

                <VStack spacing={8} align="stretch">
                    {sections.map((section) => (
                        <Box key={section.title}>
                            <Text fontWeight="semibold" mb={3}>
                                {section.title}
                            </Text>
                            <HStack spacing={8} wrap="wrap">
                                {section.items.map((item) => (
                                    <HStack key={item.key} spacing={2}>
                                        <Text minW="50px">{item.label}</Text>
                                        <Switch colorScheme={switchColor} />
                                        {item.hasInfo && (
                                            <Tooltip label="ارسال پیامک شامل کارمزد می‌شود. لطفاً در تنظیمات دقت کنید.">
                                                <Icon as={InfoIcon} boxSize={4} color="gray.500" />
                                            </Tooltip>
                                        )}
                                    </HStack>
                                ))}
                            </HStack>
                            <Divider mt={4} />
                        </Box>
                    ))}
                </VStack>
            </Box>
        </Flex>
    )
}
