import React, { useState } from 'react'

export default function CvCard({ pdfPath = '/Jainam_Jain_Software_Developer.pdf', title = 'SDE', role = 'Software Developer' }) {
  const [hover, setHover] = useState(false)
  const [showCv, setShowCv] = useState(false)

  const containerStyle = {
    transform: hover ? 'rotate3d(0,0,0,0deg)' : 'rotate3d(20, -10, 1, 60deg)',
    transition: 'transform 400ms ease',
  }

  return (
    <>
      <div
        className="relative duration-500 group border-4 border-sky-900 overflow-hidden rounded-2xl h-52 w-72 bg-sky-800 p-5 flex flex-col items-start gap-4"
        style={containerStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="text-gray-50">
          <span className="font-bold text-5xl">{title}</span>
          <p className="text-xs">{role}</p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={() => setShowCv(true)}
            className="w-full duration-300 hover:bg-sky-900 border bg-gray-50 font-semibold text-sky-800 text-xs py-2 px-2 flex justify-center items-center rounded"
          >
            View CV
          </button>

          <a href={pdfPath} download aria-label="Download CV" className="w-full duration-300 hover:bg-sky-900 border bg-gray-50 font-semibold text-sky-800 text-xs py-2 px-2 flex justify-center items-center gap-2 rounded">
            Download
            <svg y="0" xmlns="http://www.w3.org/2000/svg" x="0" width="100" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" height="100" className="w-4 h-4 fill-current">
              <path fillRule="evenodd" d="M22.1,77.9a4,4,0,0,1,4-4H73.9a4,4,0,0,1,0,8H26.1A4,4,0,0,1,22.1,77.9ZM35.2,47.2a4,4,0,0,1,5.7,0L46,52.3V22.1a4,4,0,1,1,8,0V52.3l5.1-5.1a4,4,0,0,1,5.7,0,4,4,0,0,1,0,5.6l-12,12a3.9,3.9,0,0,1-5.6,0l-12-12A4,4,0,0,1,35.2,47.2Z" />
            </svg>
          </a>
        </div>

        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-125 duration-500 absolute -bottom-0.5 -right-20 w-48 h-48 z-10 -my-2 fill-gray-50 stroke-sky-900"><path strokeWidth="5" strokeMiterlimit="10" d="M 50.4 51 C 40.5 49.1 40 46 40 44 v -1.2 a 18.9 18.9 0 0 0 5.7 -8.8 h 0.1 c 3 0 3.8 -6.3 3.8 -7.3 s 0.1 -4.7 -3 -4.7 C 53 4 30 0 22.3 6 c -5.4 0 -5.9 8 -3.9 16 c -3.1 0 -3 3.8 -3 4.7 s 0.7 7.3 3.8 7.3 c 1 3.6 2.3 6.9 4.7 9 v 1.2 c 0 2 0.5 5 -9.5 6.8 S 2 62 2 62 h 60 a 14.6 14.6 0 0 0 -11.6 -11 z" data-name="layer1"></path></svg>
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-125 duration-200 absolute -bottom-0.5 -right-20 w-48 h-48 z-10 -my-2 fill-gray-50 stroke-sky-700"><path strokeWidth="2" strokeMiterlimit="10" d="M 50.4 51 C 40.5 49.1 40 46 40 44 v -1.2 a 18.9 18.9 0 0 0 5.7 -8.8 h 0.1 c 3 0 3.8 -6.3 3.8 -7.3 s 0.1 -4.7 -3 -4.7 C 53 4 30 0 22.3 6 c -5.4 0 -5.9 8 -3.9 16 c -3.1 0 -3 3.8 -3 4.7 s 0.7 7.3 3.8 7.3 c 1 3.6 2.3 6.9 4.7 9 v 1.2 c 0 2 0.5 5 -9.5 6.8 S 2 62 2 62 h 60 a 14.6 14.6 0 0 0 -11.6 -11 z" data-name="layer1"></path></svg>
      </div>

      {showCv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowCv(false)}>
          <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="font-bold text-gray-800 text-lg">My CV</h3>
              <button
                onClick={() => setShowCv(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Close CV View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 w-full bg-gray-200 relative">
              <iframe
                src={`${pdfPath}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full"
                title="CV View"
              >
                <p>Your browser does not support PDFs. <a href={pdfPath} download>Download the PDF</a>.</p>
              </iframe>
              {/* Overlay to prevent right click context menu on the pdf if possible, though iframe handles events separately */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
