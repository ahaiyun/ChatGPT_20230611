import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ChatGptConfig } from '@/types'
import { NotificationInfo } from '@/types/admin'

export interface ConfigState {
  // 配置信息
  config: ChatGptConfig
  // 模型
  models: Array<{
    label: string
    value: string
  }>
  // 配置弹窗开关
  configModal: boolean
  // 修改配置弹窗
  setConfigModal: (value: boolean) => void
  // 修改配置
  changeConfig: (config: ChatGptConfig) => void
  notifications: Array<NotificationInfo>
  shop_introduce: string
  user_introduce: string
  replaceData: (config: { [key: string]: any }) => void
  website_title: string
  website_description: string
  website_keywords: string
  website_logo: string
  website_footer: string
}

const configStore = create<ConfigState>()(
  persist(
    (set, get) => ({
      configModal: false,
      notifications: [],
      shop_introduce: '',
      user_introduce: '',
      website_title: '',
      website_description: '',
      website_keywords: '',
      website_logo: '',
      website_footer: '',
      models: [
        {
          label: 'GPT-3.5',
          value: 'gpt-3.5-turbo'
        },
        {
          label: 'GPT-4',
          value: 'gpt-4'
        }
        // {
        //   label: 'GPT-4-0314',
        //   value: 'gpt-4-0314'
        // },
        // {
        //   label: 'GPT-4-32k',
        //   value: 'gpt-4-32k'
        // },
        // {
        //   label: 'TEXT-002',
        //   value: 'text-davinci-002'
        // },
        // {
        //   label: 'TEXT-003',
        //   value: 'text-davinci-003'
        // },
        // {
        //   label: 'CODE-002',
        //   value: 'code-davinci-002'
        // }
      ],
      config: {
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        presence_penalty: 0,
        frequency_penalty: 0,
        max_tokens: 1888
      },
      setConfigModal: (value) => set({ configModal: value }),
      changeConfig: (config) =>
        set((state: ConfigState) => ({
          config: { ...state.config, ...config }
        })),
      replaceData: (data) => set((state: ConfigState) => ({ ...state, ...data }))
    }),
    {
      name: 'config_storage', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage) // (optional) by default the 'localStorage' is used
    }
  )
)

export default configStore
