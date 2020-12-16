package main

/*
  Multiline comments
*/

// Import fmt
import "fmt"

// This is the main function
func main() {
	fmt.Println(1)
}

type (
    IZ int
    FZ float
    STR string
)

func functionName(param string, paramtwo string) (string, error) {
	var a IZ = 5
	c := int(a)
	d := IZ(c)

	// ...
	return param + paramtwo, nil
}


func worker(a, b int)  {
    go func() {
      a + b
    }()
}