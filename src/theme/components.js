const components = {
  MuiTextField: {
    variants: [
      {
        props: { variant: 'filled' },
        style: {
          background: "#000",
          width: "10%",
          height: "140px",
          // "& .MuiFilledInput-root": {
          //   borderRadius: "10px",
          //   "&::after": {
          //     display: 'none'
          //   },
          //   "&::before": {
          //     display: 'none'
          //   }
          // }
          "& > input": {
            fontSize: "40px"
          }
        },
      }
    ]
  }
}

export default components;