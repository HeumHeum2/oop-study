/**
 * Stack 기능 구현
 * string 만을 입력 받는다.
 * push로 값을 입력 받는다.
 * pop으로 최상단의 값을 출력받는다.
 */

// me
// {
//   interface Stack {
//     readonly size: number;
//     push(value: string): void;
//     pop(): string;
//   }

//   type Node = {
//     head: Node | null;
//     data: string;
//     next: Node | null;
//   };

//   class StackMaker implements Stack {
//     private node: Node = { head: null, data: "", next: null };
//     private length: number = 0;

//     push(value: string): void {
//       this.node.next = this.node;
//       this.node.data = value;
//       this.node.head = this.node;
//       this.length += 1;
//     }

//     get size() {
//       return this.length;
//     }

//     pop(): string {
//       if (this.node.head == null) {
//         throw new Error("Stack is empty");
//       }
//       const result = this.node.data;
//       this.node.head = this.node.next;
//       this.length -= 1;
//       return result;
//     }
//   }

//   const stack = new StackMaker();
//   stack.push("hi");
//   stack.push("hello");
//   stack.push("my");
//   stack.push("name");
//   stack.push("heum");
//   console.log(stack.size);
//   stack.pop();
//   stack.pop();
// }

// 만들고자 하는 틀
// 첫번째 시도 : { '0': {key: "0": value: "value0"}, '1': {key: "1" : value: "value1"} }
// 두번째 시도 : { 0: {value: "value0"}, 1: {value: "value1"}   }

// 세번째 시도 : { head: Node, data: string, next: Node }
// 맨 처음에 입력이 되었을 경우, next에 현재 node를 집어넣고, data에 입력받은 값을 넣는다.
// 그 이후, head에 자기자신을 집어넣는다.
/**
 * 시나리오
 * { head: null, data: '', next: null }
 * =>
 * {
 *   head: {
 *     head: null,
 *     data: "hello",
 *     next:
 *       { head:null,
 *         data: '',
 *         next : null
 *       }
 *     },
 *   },
 *   data: "hello",
 *   next: {
 *       head: null,
 *       data: '',
 *       next : null
 *     }
 * }
 *
 *  */

/**
 * 두번 째 입력할 때도 동일하다.
 * 시나리오
 * {
 *   head: {
 *     head: null,
 *     data: "hello",
 *     next:
 *       { head:null,
 *         data: '',
 *         next : null
 *       }
 *     },
 *   },
 *   data: "hello",
 *   next: {
 *       head:null,
 *       data: '',
 *       next : null
 *     }
 * }
 * =>
 * {
 *   head: {
 *
 *   }
 *   data: "world",
 *   next: {
 *     head: {
 *       head: null,
 *       data: "hello",
 *       next: {
 *           head:null,
 *           data: '',
 *           next : null
 *         }
 *       },
 *     data: "hello",
 *     next: {
 *         head:null,
 *         data: '',
 *         next : null
 *       }
 *     }
 * }
 */

// pop을 할 땐, 현재 head를 노출한다.

// 문제점
// data를 공유하면서 문제가 생겼다. 그냥 head는 현재 위치만 가지고 있고, next만 이용해서 사용하면 되었다.

// lesson 복습
{
  interface Stack {
    readonly size: number;
    push(value: string): void;
    pop(): string;
  }

  type StackNode = {
    readonly value: string;
    readonly next?: StackNode;
  };

  class StackImpl implements Stack {
    private _size: number = 0;
    private head?: StackNode;

    get size(): number {
      return this._size;
    }
    push(value: string) {
      const node: StackNode = { value, next: this.head };
      this.head = node;
      this._size++;
    }
    pop(): string {
      if (this.head == null) {
        throw new Error("Stack is Empty!");
      }
      const node = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }
  }

  const stack = new StackImpl();
  stack.push("hi");
  stack.push("my name is");
  stack.push("eunheum jo");

  while (stack.size !== 0) {
    console.log(stack.pop());
  }

  stack.pop();
}
