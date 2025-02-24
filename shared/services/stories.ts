import { Story, StoryItem } from '@prisma/client'
import { instance } from './axios'

export type IStory = Story & {
	items: StoryItem[]
}

export const getAll = async () => {
	const { data } = await instance.get<IStory[]>('/stories')

	return data
}
