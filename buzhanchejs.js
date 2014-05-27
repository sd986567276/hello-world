#pragma strict
var buzhanche:GameObject;
var paota:GameObject;
var paodan:GameObject;
var ctl:CharacterController;
var dist:float;
var dis1:float;
var dis2:float;
var speed:int;

var bubing:GameObject;
var bubingweizhi:GameObject;
var bubingpe:GameObject;
var pan1:int;


static var jishiqi:int;//计时器
function Start () {
      ctl=GetComponent("CharacterController");
      dis2 = Vector3.Distance(paota.transform.position, transform.position);
      dis1=Random.Range(dis2*0.4,dis2*0.6);
      speed=Random.Range(5,15);
    //  Debug.Log("dis1"+dis1);
}

function Update () {
// 1.当实例化步战车之后，检测炮塔位置，角色控制器自动转向使得步战车的头部朝向炮塔；
      var TargetRotation:Quaternion= Quaternion.LookRotation(paota.transform.position - transform.position, Vector3.up);
      ctl.transform.rotation = Quaternion.Slerp(transform.rotation, TargetRotation, Time.deltaTime * 2.5f);
// 2.步战车以一定的速度向前移动，每一帧都检测车与炮塔的距离 
        dist = Vector3.Distance(paota.transform.position, transform.position);
        if(dist>=dis1){       
          var b:Vector3=transform.TransformDirection(Vector3.forward*speed);
          ctl.SimpleMove(b);
       //   Debug.Log("dist        "+dist);
          }
//3.让每一个步战车实例化步兵与炮塔的距离在一个随即范围内
         if(dist>dis1 && dist<dis1+0.2){
           //  Debug.Log("aaaaaaaaaaa");
             jishikaishi();
     		 dist=dis1-1;
         }
         if(jishiqi>3){
                bubing = Instantiate(bubingpe,bubingweizhi.transform.position,bubingweizhi.transform.rotation);               
                pan1+=1;       
                jishiqi=0;                                    
          }
         if(pan1>4){
                  xiaohuiksihi();
               	  Debug.Log("aaaaaaaaaaaa");
                  pan1=4;
                }
       
}
 // 4.步战车的碰撞检测，当碰到炮弹发生触发,炮弹和步战车销毁，
function OnTriggerEnter (other : Collider ) {
	if(other.name=="paodan"){
	  Destroy(gameObject);
	  Destroy(other.gameObject);
	}
}

function jishiqihanshu(){

   jishiqi+=1; 
}
function jishikaishi(){

		InvokeRepeating("jishiqihanshu",0,1);
}

function xiaohui(){

		Destroy(buzhanche.gameObject);
}
function xiaohuiksihi(){

		InvokeRepeating("xiaohui",3,2);
}

	



















   
    