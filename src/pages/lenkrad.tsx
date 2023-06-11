const Lenkrad = () => {
  return (
    <>
      <style jsx>{`

       * {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background: radial-gradient(#B8BEB4, #71685F);
            {/* clip-path: polygon(51% 45%, 100% 50%, 50% 100%, 0% 50%); */}
       }

       body {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .lenkrad:before,
        .lenkrad:after {
            content: "";
            position: absolute;
            width: 13px;
            height: 260px;
            background-color: #333;
        }

        .lenkrad:before {
            top: 40%;
            left: 52%;
            transform: translate(-100%, 0%);
        }

        .lenkrad:after {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(90deg);
        }

       .lenkrad {
            width: 300px;
            height: 300px;
            border: 5px solid #333;
            border-radius: 50%;
            position: relative;
background-size: 100% 100%;
background-position: 0px 0px,0px 0px,0px 0px,0px 0px,0px 0px,0px 0px,0px 0px,104% 0px;
background-image: radial-gradient(70% 70% at 50% 50%,#07080900 4%,#181313ff 5%,#645d5dff 17%,#6b6762 16%,#e6f0f4 18%,#f0f5f8 22%,#464a5800 22%,#507c81 22%,#073aff00 26%,#073aff00 60%,#101012ff 61%,#22242eff 62%,#c8966eff 67%,#45403d 73%,#c8966e 74%,#073aff00 74%,#073aff00 53%)

        }
    `}</style>
      <div className="lenkrad">
      </div>
    </>
  )
};

export default Lenkrad
