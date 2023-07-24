import { Between, FindOptionsOrder } from "typeorm";
import { MySQLConnect, AppDataSource } from '../databases/db.js'
import { Feed } from "../databases/entity/Feed.js";

type SelectRangeType = {
    idxStart: number
    order?: any
    range: number
}

const feedModel = {
    get: async function ({ idxStart, order, range }: SelectRangeType) {
        try {
            const feedRepository = AppDataSource.getRepository(Feed);
            const getFeed = await feedRepository.find({
                take: range,
                skip: idxStart, 

                order: {
                    date: order,
                },
            })
    
            return { status: 1, result: getFeed }

        } catch (err) {
            throw Error(err)
        }
    },

    insert: async function ({ content, owner, date, type }) {
        try {
            const feedRepository = AppDataSource.getRepository(Feed);
            const insertFeed = await feedRepository.createQueryBuilder()
                .insert()
                .into(Feed)
                .values([
                    { 
                        content: content, 
                        owner: owner, 
                        date: date, 
                        type: type 
                    }
                ])
                .execute()
    
            return { status: 1 }

        } catch (err) {
            throw Error(err)
        }
    },
    
    delete: async function ({ idxFeed, owner }) {
        try {
            const feedRepository = AppDataSource.getRepository(Feed);
            const deleteFeed = await feedRepository.createQueryBuilder('feed')
                .delete()
                .from(Feed)
                .where("idx = :idx AND owner = :owner", { idx: idxFeed, owner: owner })
                .execute()

            return { status: 1 }

        } catch (err) {
            throw Error(err)
        }
    },
    
    update: async function ({ idxFeed, contentFeed, owner }) {
        try {
            const feedRepository = AppDataSource.getRepository(Feed);
            const updateFeed = await feedRepository.createQueryBuilder()
            .update(Feed)
            .set({ content: contentFeed })
            .where("idx = :idx AND owner = :owner", { idx: idxFeed, owner: owner })
            .execute()

            return { status: 1 }

        } catch (err) {
            throw Error(err)
        }
    }
}

export { feedModel }