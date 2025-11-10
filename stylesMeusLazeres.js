import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'android' ? StatusBar.currentHeight : 0) + 10,
        paddingBottom: 15,
        paddingHorizontal: 15,
    },
    headerButton: {
        width: 48,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    listContainer: {
        padding: 15
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100
    },
    emptyText: {
        color: '#999',
        fontSize: 16
    },
    cardWrapper: {
        width: '100%',
        marginRight: 0,
        marginBottom: 15
    },
    cardContainer: {
        position: 'relative',
    },
    editButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 20,
        zIndex: 10,
    },
    modalKAV: {
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '90%',
    },
    modalHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#555',
        marginBottom: 5,
        marginTop: 15,
    },
    input: {
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputGroup: {
        flex: 1,
        marginRight: 10,
    },
    inputGroupSmall: {
        width: 100,
    },
    pickerContainer: {
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        justifyContent: 'center',
    },
    picker: {
        color: '#333',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timeInput: {
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
    },
    timeInputText: {
        color: '#333',
        fontSize: 16,
    },
    timeSeparator: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#888',
    },
    diasContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    diaButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    diaButtonSelected: {
        backgroundColor: '#4B0082',
    },
    diaText: {
        color: '#555',
        fontWeight: 'bold',
    },
    diaSelecionado: {
        color: '#FFFFFF',
    },
    submitButton: {
        backgroundColor: '#2ECC71',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 25,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#E74C3C',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default styles;