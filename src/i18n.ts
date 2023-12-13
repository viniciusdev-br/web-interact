import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).use(initReactI18next).init({
    debug: true,
    fallbackLng: "pt",
    interpolation: {
        escapeValue: false
    },
    resources: {
        pt: {
            translation: {
                login: {
                    titleForm: "Entre em sua conta:",
                    placeholderUserName: "Nome do usuário",
                    placeholderMaxCalls: "Limite de chamadas simultâneas",
                    btnConect: "Conectar",
                },
                navbar: {
                    logout: "Sair",
                },
                home: {
                    listServices: {
                        title: 'Atendimentos:',
                    },
                    detailService: {
                        title: 'Chamada selecionada: ',
                        idCall: 'ID da chamada: ',
                        midia: 'Mídia: ',
                        startDate: 'Data inicial: ',
                        service: 'Serviço: ',
                        caller: 'Chamador: ',
                        btnEndCall: 'Finalizar',
                        titleUnselected: 'Selecione uma chamada',
                    },
                    toast: {
                        newCall: 'Nova chamada recebida de {{caller}}.',
                        endCallError: 'Erro ao finalizar chamada: {{error}}',
                    }
                }
            }
        },
        en: {
            translation: {
                login: {
                    titleForm: "Enter your account:",
                    placeholderUserName: "User name",
                    placeholderMaxCalls: "Maximum simultaneous calls",
                    btnConect: "Connect",
                },
                navbar: {
                    logout: "Logout",
                },
                home: {
                    listServices: {
                        title: 'Calls:',
                    },
                    detailService: {
                        title: 'Selected call: ',
                        idCall: 'Call ID: ',
                        midia: 'Media: ',
                        startDate: 'Start date: ',
                        service: 'Service: ',
                        caller: 'Caller: ',
                        btnEndCall: 'End call',
                        titleUnselected: 'Select a call',
                    },
                    toast: {
                        newCall: 'New call received from {{caller}}.',
                        endCallError: 'Error ending call: {{error}}',
                    }
                }
            }
        }
    }
})

export default i18n;