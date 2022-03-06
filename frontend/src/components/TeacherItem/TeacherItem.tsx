import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './TeacherItem.css'

function TeacherItem() {
    return (
        <article className="teacher-item">
        <header>
            <img src="https://cdn.vox-cdn.com/thumbor/GAI9xVQtPBrX2TZSCtwV5mVIWeg=/0x0:5568x3712/920x613/filters:focal(2858x720:3748x1610):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg" alt="asds"/>
            <div>
                <strong>Um cara ai</strong>
                <span>Quimica</span>
            </div>
        </header>
        <p>
            ekjhskd kjahsdkjhskd kjahskjd kjhaskjhd kjhaskjhdk dkajhsdk.
            <br/><br/>
            kjskjd 2oiooirt lxkcvlkcv.l wpdoupreot .;jlsdhoid pourtklmfgl;kflknld
        </p>
        <footer>
            <p>
                Preco/hora
                <strong>$ 20.00</strong>
            </p>
            <button type="button">
                <img src={whatsappIcon} alt="entrar em contato"/>
            </button>
        </footer>
    </article>
    );
}

export default TeacherItem;