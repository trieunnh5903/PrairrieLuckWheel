import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const rates = [0, 0.2, 0.2, 0.6, 0, 0, 0, 0];
const App = () => {
  const rotationValue = useSharedValue(0);
  const totalRate = rates.reduce((acc, rate) => acc + rate, 0);

  // event
  const onStartPress = () => {
    const randomRate = Math.random() * totalRate;
    console.log('randomRate', randomRate);

    let cumulativeRate = 0;
    let selectedSegment = 0;
    for (let index = 0; index < rates.length; index++) {
      const element = rates[index];
      cumulativeRate += element;
      if (randomRate < cumulativeRate) {
        selectedSegment = index;
        break;
      }
    }

    const degress = (360 / rates.length) * selectedSegment + 10;
    console.log('degress', degress);

    rotationValue.value = 0;
    rotationValue.value = withTiming(10 * 360 + degress, {
      duration: 10 * 1000,
      easing: Easing.bezier(0.42, 0, 0.58, 1),
    });
  };

  const wheelAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: rotationValue.value + 'deg',
        },
      ],
    };
  });
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Animated.Image
          source={{
            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO8AAADTCAMAAABeFrRdAAAAkFBMVEX///8AAAD5+fl4eHhzc3P8/Px+fn5vb2/19fXQ0NDt7e3m5ubCwsJ6enrh4eGpqam4uLjW1taxsbHc3Nzq6urGxsagoKCZmZm7u7utra3Y2NiGhoZjY2OTk5PKyspPT09dXV2Li4ucnJxGRkY+Pj4pKSkzMzNKSkpfX18bGxsRERFVVVUmJiYyMjIfHx8XFxcJjbQPAAAVpklEQVR4nO1dB5uqPBpNkEAo0qsUZUSdkTsz///fLcVCoiKR4t3de55n9xvLNRzy9rwJAPzDLLCAbeJ3X8R8cFTJ8Lbvvoo5oHqeZwB1pQCQc+++mOmhSEmQIaCXfyLx3RczB1Dm6sAOyr8s7d3XMgfsxAqA6pSC7b77UmbBxlLjwAdA3wS68e6LmQEOhzQsl4qs2TZ698X8wz+8Ec77hubwVflUgPuHhghxLTBpsGOAxfI9TkxOkq18+ttVjGStPv0n2DT0RCz2R9jC7hBHnpUqvQYNFAOk8YCrfh0aB5YpUFU10IDHySD1Or6MVmqyLsntCz7y9SBdOTIGS+woqWt9ZEKcf5WfLQxJfvQDOCqKIgB6GX+qqwnY9IKgSEbC6zIKy+nmHwk0Jxt8/rVbR6qmyG3pFa5/YkeT/Hj/tfv0tLu/4yie5QLZAsD7o4/HgAm2AZBtJBpwJYDUnL/3Hc6Icghj696cCDfvKGp2hEdev6Ohiu5LwKrmX/oaeN0vQi5DJKCnIga1JDu3aiVbOfzi9Ueqecu3AhdUdygxqbdFN5K0embluzd2ctifpqQDqC1CIyjn2bQC8nM5jY/76L50NrjPF1Qa4K2PudX2PWipuGKqAuQt/ffkkHZpqRwkISWQZYDSgJRYO/uGsdt9ZQ/5VlglpRqo/yXhpvoNC+vpNHTyLZFGpVz//RUfztgde13mM76lFBsHmPXzzO8CDvOj3y/qe863sl75UXjold8O5EHo9RXBPnxLuDl8Uwj5FAb8tvp/uyff0uPGMPoL59g+/H6w+IrefEvG+Z+7N3Iua3an8MQlUGQzLQx8K0XZ3BFqvXRY3kROKxMO59tpp+VQ5OUacJ8y/iAL3yqsghE9nVU8vSgm4usAwQYrSZI0YGjAPGStz+wCeqUoR0w/yMK3TKdAuj1eYrhwI269Mj0Err6ZKiiRPKBZi0zQqlp5YrX4qnBTi/KC6fdY+IZVPI09GDUGgnN8WyiFHDgW3jAN2h9KAiUgfxhqGUqWKYJx5RvBU4q2ZPpBFr5Wkz9IP7uTbxekBGgq4KNox+AS2KCHQArLzMXiuCgq8pO+rvI/9ukL083viS/geFjTU0u+uBRnhOximvyB05Qy1V27vufWs2mdlDWA/MU3Jky/yCzPNXS4KBU2MZzCqK9DWUyjv7KuY4Bc7IRO7Ri0+grQRZbZwcJXu8Yb0u/+beEW3u/aY0tM/5jNH7XAw+e1wUmAvjdEasBWeWDhG9jtV9meaaDRIB8+iNeT2+czYv4NC20SjKkZnY2vEEA22zgCAlhOLmmsppNniq8OpOPMvQHhHcM8Xb5A6m+F1a84Z+HOaugGz77XgZftczOsA2ecYbUJcwA55HTyrJD5fh3IOb9TEb4pLkhnYSatxnT2KiT116//3z6OabSE5dmrV2lmumhpkHO8n/nNZp9PMOF4uUJ45adqYJG0olQZXhIDMsefPl+ghnVHI4yE2AU42sSbAOgo2EjXuFHeXS0jqUFdS6K3GCDPlxurQ9JicmUc4qQvlbXkT7NZhcRWFc/kZ8J4s73+HltFgwQLX4ekcB3Wh4SnChwQxMFrZTxNB4r+Ua1CojUC0XnyIvjw59jC+AH+qIXlrhG2xPcTCXhIOrz6S5YElm5mOlX1Rgf86T5asC1a5CrZbPFVe9hdrVPuKsxSwFngM475FzJijl+mAMVaELtB9Uo86YkDCSUl9Xc2+9w2jKtjfUVmkGkg0HChgGK8PkVUkMvab+JLzKABK9PiS83K+6cCeNbK8GMIsCtoZYt3hvvfE6JjaVGgIkR6aUDSz8RnuowuBJAqYZAZAptdZOHrkiUcKjHJF1UMyClcNRnyeAuoMoyoHxsSwQ6wz5RhtF8vonVC/MTU0q7Y8eoZWPja5Li0BbYe+8gBcEvDQP0uOe5s9op2ONoU2T/OM6CF1HvEq9n40rOJJNqwjAD/yAGbCpHJ2zpbvkDLM5aj7djVDruq+mKq1E3yZUtWBuQLdCCXGgiO54UaFBU3RN3FIW0GLHwxOS49rBScoo7xoMLKFTmdodp08/sEVfd1MWqfMP6+Ky9z6S8tz7T+lu5KG9VkWU0gSc/vX5AvVFAqWRY+mYbvBNo3pTHaPpM6Mxvfu6qqwfE6wYPfJsDROtdt3pQvlMlgXWn4HE+DH1U+2TSWBAtfiYzb6X+a1tNgwu670h8uPMWvMmUTyBll804D7DN9m7Wm+BKPNMGoOBfIOIoSSX+6eg41vw8ssQTHyQXTS/pB8yUxd739Avt0A2K2K3iEzeVnNCrRJOuxs/HNKP+LTq8lOEZfqfZ7kR+a75vqk/TqqHN2UMcxEn/92i5B5/skpqs/h93ynJ7dpL8eoTvp59ql0a2/bGDqj+3+WDrfaXuEmGPVyjyczhh1uvWjJ9squUv6lGdd3+uFpHdcOlu+QONakzSOTNdwBwi2YkilM558mz9yLmbF+Rnai+bClizR+QKJt/FtlSHEodvt+HbMqHTevdnqVzTM62W5kOkibiDvn/bgpJ73ittj4bu68YNYb42aXtWMg8NWj1ZETCrf+7EFlhs3xVZBGlbPUSAnX5yj0ho5Hmah9V37FUdUfhsvoVjo9C6b6rBIf3oldNJVLUH31xS8YRs4CmIacHuy8U8tRqtEzJv0mM1esdydlv4mP/V/tEQ8XKJ3uxUWSHDIIQ6IrIIR9tltBrQFoP2p7ykbX5b5vfJFn/t6Xo0FUH7vzuQgBU5/CKUk8gU+PVZLGwkCZhOSTCfPV76qv7Sq7TkiAnZxflNpR5HFEMOgF8TLU/ysLwUhwvsllLOwsjtRI0JsBVEWvtf4SojzSIH1qNetsmk7DApzpssgcSCtHdfSDU8CSQKWmgAiSXuhsPBS7QuJAJce9k+pRFmqnEeV2mVi8+ummbY/qCK2fBUcbqOD6FMDUFM3UbNHhU7Du8HCVz7b4jDmpMIDAbTdjSCe7z4xLt6/HlI6zxeSW0v+C6Y1Oib9pW1QRpgVh3hVkLsMWGD8khSUziWiGfmSkIm0XCgefe8pMqrCefJHkkqj2T84OV9q4PO0kmGQ8XoILVJ1dqcZ15Zo1Jo0nf6e+dp3Ri0hEWmq8jJfvA2ff+lVsPDVumMmibhM+eWijvNFrQc6pOmTLeJzabL5JcEZVNmB7LnCu1d3Jyn0ojm5vo+WErGrm59Mf1Ui//XVNVl3oC6rYCukXaHRmoAJV44cELVt/1z2WQEBuXClkVGC8GpKGNB8NXqdUGzfgPn8UdYZUiSvdmN5O+oNjZIUixiXbQfUAL4r6rZT8+utqwux+L7TLMu4OYkso5vFqRx7FeH2DWCrb7DwDQhCMg904kJI+wysfcl3xYOo33awYBHtkjpi4ekFVbr/agiGrJVTWJHirVYNwp4F0n4JKja0k6X9pPdj4M7UYzr9VZjWcVbVMmHS/yjDSBYbT7q+aULq9LBvi58VMsBwKr5hmUX12z7jQLBpKn4H2pEpnYXXt/HF5PTLFV/lE4j9+jnsEOiNAbwJJzVqwsnLmC7eoPjSgRzFl6uXvVdL5ga0nA7M6H6VmBj4Y/J84QT6sEuJSlOpZf6wr5XNnxn0AZUTJr4OSYA+N5ryRzTf3udn5XQYgzv1iG3fzzi9JTU4ar6pqowI4c3OiwaZyLew+F3z3ciJr++efJvEd9eHCwLLIl62X+bk50uR+HixgHz7tfBdHcy7vZdSEkcVc2CrA+INTjaJb4C4da4xquwz6otanjs+JWGQdmNJGUbKH3GUPJfzm4d9dnTc+CMa1P7fyeyV0W2fKcgU382xx2mYlae9jTc6MVu+8AQKxbeHVcWHytXEz5YmyAyklxGUo1PZmIUv1c+fdN9Ys7JXIlMIGq6+S6e1fBaAiuxrj0vJabz2gHxh0a2M6i8Gxi+Lt8AC0Mu5S549wIb9/A284cC69v8D+Krd8xvmXJkL9q1Cy9lSkjYRX3LVfx5+KU3Tl6qA1eTmtUKNmA9S+CjAKgRFy+PGuf3TVWqthL8IO5o/LEuq+LIXxvAGg+0Lp/sR0G/nF2H5ssiU8SCLo/ZZpyj2ulZGUi8Fju45N/W6y366SMqq5OMF/Y1cu2E6rv6qMPTO0f4icZLqlJDWx3avVX8FUqY8Ot+AjYWP5U1+oRzPJaeslIUvIs+YuLrTSwONal6aKLl16AsKsFpHgWNPyXss2cp/yADaiYsmpfQc5N+thmG+9x4CFr72oyaFj/ME6J4lnKIF/HNjRkUfH/jnDoo7kPm9YZ1YRqUbrVpvb5TC7t+BzMI32RAVSeM8cTjOTxK4dkB8uicyLZX9wZ+GEaJIKLnxUbXWmCNUvV0FMTf6y3u9uwlY+BYrog/0or+u5520QwDB70kYb6xOfyREM5NZAFwdMrpwQk5yq01t13gTV+t1mCuC3lutGfhKa+GrrX7eeX4jUfxEIFwCvbwS9eRxw9f5BsR5DLbLOWmZqfi5hVXK58vVeixW/bTo203AwLeMQMV7obxcxn9QA5ph+2UiF56+snx9Yx2+O1vy5dRJihv3Y4F417Pfqz9f2U853W+Zm/OTDlJf1rzqaSb5GgTJ2ZisB2xieHK0Ja2/ZUrc+xE/Y/rfj5Y5k3cDzldpMiRZuQtu0PlIA/je5ketyZd+Buy60usNH5J+F8OeNjVV/NzfQ9yBeez0Zdcyi3VFz6SpP19PqLC4VlXNpjF3IZBo1qKHbdk4EgqsLQ9ELfeqv9oVPcVpqvx32C7RDbHGpstkQ+UrR02dwdSvIhCVFoHgm/Jtg5weB6mZQT1eqWvNTeVZenFZ+Ao4fnj2ohyBn5ZF9odtirWpYFQg+4OJz1xgMLh6pvyoLrdch6XEKr4qHWKsMdLAOZETWAaxJEr7X4PBQbHpL9+WUkp/cWs9CQ/d5C205UOHH+v2wDHFl0WfmfjqhNmk1ssWLe9702LDihUZUnYSWip2/4OZWPj6WzV+VKPjFqJ3FavPoRsI0a6jSEWm0P46Wk7D17aJHUjEc/04277eZe04+NQRv2ODy8Ob3gMD/O/yYanicUW1N26KWC28ie/iId8/r7YStpA/NrpDjlEbwPfhsNJxhIYpY/dwFods5RrA9+Gw4eb1H71A+bpETRx1++aSZ5scl5bnSz/wZpTzkcXN+S+6X5Tky/Y4bqb1XzLnemSvgs7jQHvDvrRB03zJVEhkUmcmvmSZRaFurNPEVNx6pAPOL+eWdJ/PMF1/+5OcWmqscjrKcSOgNcEclWv9Jf5o1awcbYeUlwhsTxN8029G8GV72ifT+j510CXFt2lwccdwRg0e/ZRJSPDDZzzfxQB5tuljEuuI6DDik4G3TX3B6e4XZeLLcnVGd1lYrtTMHOk0qBqnE780KvsgG6HY+LJsMqD4ZrQ8VwOPdBhUA25d2wJq/xGlvzcPROwEE99u/2uG1T72UQ/cNO9mDe6AgJKFL1XzTCn9Lf0Rtx3x/M4Ky6ryLnfqkcnEfsQjjMt40vsZ+QhouTpEmz4/NiEYssVXLHxd0g9+0MdQI2fER6mcEJbRC71fI36PvaL1V5P4DcvQvYAK8cY+G8T8zsb35okh6Zi+6IwVlJzOreLTyfMT/+uM+iSkC7JcphiRDxtmywdZ+AYkX7qZ2T9O8lBN7NE+aUi+MMA+U/orwYm2Za8kKp7UifvKUIwFbHyp/RoWMRAe/SzziyNSOu3ChPaqI/9F8botZQPcsC0I519yS0n+8AESyR2j1l9gnz1yAaSUQLx47cSRVgbzAeS8WnREkIjKSf1lywdH8r8q2VLjGCA4vFbmkIoyfJLixTqS7RQcrHoVUmofV0jFV/5c8uy11wPPrij85KuTZhxtK73mjDEIY2AGSoyAgRWo83WK5I3l2pns1cM1+/h8gip2fDOrnmHu5caeuSPJ9uv+rlKik6oj3QdSVMpy/dGi1UqsEvPrMnmnAf7omh8tmhJdfbnL1Ae2C6IUqMxr/JxcrcFxEXC2XMyZLkA7pJx+ZZNfCM+lvwE5YRf9jU7tQ9XZfWrkelygAJUH3kv+OFhm5a+IoMiqKNLgz+Eiyi8rhsJ76xt6+7gqIdDWhldeXtb7oIKewLv78jIb3xPUgWdN9oZzPHklc6b8l+K7qsUqgLM91do+eQFSf9kan5jyfXIia/1NJwgjH0KFtY4MecbyAPssyFV2OtpqQh+k8Lb8OZ083/YoqnM/sdyGJT1qWXau+EopLfMIjQts0HZrTnyPPxKy8ctzz4EPe3HA+tEAvuvP8R6Fw4L4i2jeu7OtrwMsfIn1MvT5M+pSAgPE4+tPpGfh214Pdbb7dlmp73aJceC1vYIxR74QwA2R3lpyez/heNDCa5eOXv7vJMna7/dFl6bT34s8czxtmMuXST7+4zSRbxdnMZJKhuJ5XmX+EtZNb5+17f5iMYKYXydcagM72Uzx+FCQYeALwtKoRMho5SA6jBp5mpyvBYvrELauiNX0Yo/bTCDPDi8AW/MCoyqJKUbQyrm0P7ta1ifOFxz+Umd2fN8GkcYDHIIkSr7HfR4uklwTIGVtAecjdIFqIz7N4lZ2gDPIlxEf211m4SuV43vwolAAyTIyRUXg0hXgsL0ethOKBjLrswl0A4RGYoIQIVPKyPMtVtsv1gCPzT6b22NIeh7PRwevHlRmE6xeUKKoDCe+pXBt1cIT0svpFtyytVoz+d8lFEZ8FNEoQAIUWUqX/fliHa7fE0B2Y7WGUf9Iry9frO9/pwgoxoC6h4u+tqMfX6T/QO9vE+UWpBjG/fS4D185gZ3novwNsEW4kXoYzOd8tQxu2WLymUBdkx3DffZUkZ/wxWEB8+AO21nzoSvU7FLzly2QecSVydYB5k/UrpNvIMJjcndfTGqvsteT0JexSrn8HLpbnI4/6PKZ7B/g2uho6XjIV5F4+CM82gboAQ9v5vdOuDozCAi8KKZ1V0Nwa6Q4U9h9bZeqfF8F7/LFq6TY/W6CO6Jhiss4krVKqpK3yPQCmZpRxu3YKLPF37vChyTrE8Jtpt65wFu+phdD+P2R3tcDKVA+ETBkoG2GlL1fADZ0qTozqLoGQWnOntYfH4VmezyE8JAEKbGb8to9gBRJ1eMjhOvkwYIQtnQTJHK9MlsVsMbNh54BKZoMVAk4QDRFWa4H1zrbU7ETRJt89/Nnv46XiWepqWlvJFf1PiKxqN8vFrr2QPCbEbG85mJk14mwN7/BsnbRQgc/sr8xXMD5y6THaUuKmQaJEG9/4Blf+4LPwlTSevjrYAPyKKmOZVgab/JJ//AP/3ABGuv58f8lMHC43E3QuPz3wdY0m0MfeAWCkbdZ/JVQs2T7gbUquAjmDR3eAy6wFxgYlSjPvEo/P3Cy1EHklCFwVUvV/y/UV4bgc2WVMfiHyt3svfgfhGMA1dM4oHieP/R52//wD//H+A/6WhndmWEEbQAAAABJRU5ErkJggg==',
          }}
          style={[
            {
              width: 300,
              height: 300,
              borderRadius: 200,
              backgroundColor: 'rgba(0,0,0,0.1)',
            },
            wheelAnimatedStyle,
          ]}
        />
        <View style={styles.triangleContainer} />
      </View>
      <TouchableOpacity
        onPress={onStartPress}
        style={{padding: 20, margin: 20, backgroundColor: 'yellow'}}>
        <Text>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  triangleContainer: {
    position: 'absolute',
    top: -10,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderTopWidth: 30,
    borderTopColor: 'red',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
