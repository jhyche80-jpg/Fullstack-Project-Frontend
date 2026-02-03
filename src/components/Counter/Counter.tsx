
import type { Counter } from '../../types/types'
import '../../Styles/Counter.css'

export default function Counter({ Pending, Completed, Total, InProgress, Name }: Counter) {
    return (
        <div>
            <div className='Total'>
                <div className='divs'>
                    <p>Total {Name}: </p>
                    <p>{Total}</p>
                </div>
                <div className='divs'>
                    <p>Pending {Name}:</p>
                    <p> {Pending}</p>

                </div>
                <div className='divs'>
                    <p> {Name} Not Started:</p>
                    <p>{InProgress}</p>
                </div>
                <div className='divs'>
                    <p>Completed {Name}:</p>
                    <p> {Completed}</p>

                </div>

            </div>
        </div>
    )
}
