import { Entity , PrimaryGeneratedColumn , Column} from 'typeorm'
import { Timestamp } from 'src/user/Generics/timestamp.entity'

@Entity('newsletter')
export class NewsletterEntity extends Timestamp{
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        unique : true
    })
    mail:String
    
}