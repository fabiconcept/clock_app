import React from 'react';

const StopTable = () => {
    return (
        <section className='bottom'>
            <table>
                <thead>
                    <tr>
                        <td>Laps</td>
                        <td>Time</td>
                        <td>Total</td>
                    </tr>
                </thead>
                <tbody>
                    <div className="body">

                        <tr>
                            <td><span>1</span> <span>Fastest</span></td>
                            <td>00:00:00.71</td>
                            <td>00:00:00.71</td>
                        </tr>

                    </div>
                </tbody>
            </table>
        </section>
    )
}

export default StopTable;