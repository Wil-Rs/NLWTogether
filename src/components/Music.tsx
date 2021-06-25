import './../styles/music.scss'

import down from './../assets/images/down.png'

export const Music = () => {
    return (
        <div id="implements">
            <div className="content">
                <audio controls src="https://fatecspgov-my.sharepoint.com/personal/wilian_santos01_fatec_sp_gov_br/_layouts/15/download.aspx?SourceUrl=%2Fpersonal%2Fwilian_santos01_fatec_sp_gov_br%2FDocuments%2FNOFX_Stickin_In_My_Eye.mp3&correlationId=b538d720-b745-4483-b630-8681b0d9901f&psi=811c7229-d249-4051-8ee2-3743db581035&ccat=2&cs=fHxPbmVVcFdlYlBsYXllcg%3D%3D&App=OneDriveWebVideo"></audio>
                <div>
                    <img src={down} alt="imagem down" />
                </div>
            </div>
        </div>
    )
} 