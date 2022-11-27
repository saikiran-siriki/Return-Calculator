const DarkTheme = () => {
    return (
      <style jsx global>
        {`
         :root {
            --bg: #333;
            --text-primary: #fff;
            --text-inverse: #333;
            --primary-1: #120b1f;
            --primary-2: #160f2e;
            --primary-3: #2c1952;
            --primary-4: #482581;
            --primary-5: #492c99;
            --primary-6: #614098;
            --primary-7: #734fa0;
            --primary-8: #865ca6;
            --alt-1: #c04d01;
            --alt-2: #e9640b;
            --alt-3: #f5802c;
            --alt-4: #dda83b;
            --alt-5: #fad76c;
            --alt-6: #AAC4FF;
            --alt-7: #BA94D1;
            --inverted-1: #ffffff;
            --inverted-2: #f9f5fa
            --inverted-3: #eaeaf5;
            --success: #4AA96C;
            --danger: #F55C47;
        }
        `}
      </style>
    );
  };
  
  const LightTheme = () => {
    return (
      <style jsx global>
        {`
         :root {
            --text-primary: #333;
            --text-inverse: #fff;
            --primary-1: #ffffff;
            --primary-2: #f9f5fa;
            --primary-3: #eaeaf5;
            --primary-4: #ded7e9;
            --primary-5: #c2b8dc;
            --primary-6: #a08fbc;
            --primary-7: #a07bb7;
            --primary-8: #976eb1;
            --alt-1: #fde432;
            --alt-2: #ffed65;
            --alt-3: #fcef87;
            --alt-4: #fef8af;
            --alt-5: #fffad3;
            --alt-6: #51557E;
            --alt-7: #816797;
            --inverted-1: #120b1f;
            --inverted-2: #160f2e;
            --inverted-3: #2c1952;
            --success: #36AE7C;
            --danger: #EB5353
        }
        `}
      </style>
    );
  };
  
  export default function Theme({ theme }: {theme: string}) {
    if (theme == "dark") {
      return <DarkTheme />;
    }
    return <LightTheme />;
  }